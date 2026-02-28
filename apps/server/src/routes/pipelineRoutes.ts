import { Router, type Router as RouterType } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const router: RouterType = Router();

// In-memory store for pipeline runs (would be Redis/DB in production)
const pipelineRuns = new Map<
  string,
  {
    status: 'running' | 'completed' | 'failed';
    nodeStates: Record<string, unknown>;
    error?: string;
  }
>();

const pipelineRunSchema = z.object({
  nodes: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      data: z.record(z.unknown()),
    }),
  ),
  edges: z.array(
    z.object({
      source: z.string(),
      target: z.string(),
      sourceHandle: z.string().optional(),
      targetHandle: z.string().optional(),
    }),
  ),
});

// POST /api/pipeline/run — submit a full pipeline for execution
router.post('/run', (req, res, next) => {
  try {
    const { nodes, edges } = pipelineRunSchema.parse(req.body);
    const runId = randomUUID();

    pipelineRuns.set(runId, {
      status: 'running',
      nodeStates: {},
    });

    // In MVP, pipeline execution is client-orchestrated.
    // This endpoint serves as a registry/tracking point.
    // Full server-side orchestration would be a v2 feature.

    res.json({ runId, status: 'running', nodeCount: nodes.length, edgeCount: edges.length });
  } catch (err) {
    next(err);
  }
});

// GET /api/pipeline/status/:runId — SSE endpoint for pipeline progress
router.get('/status/:runId', (req, res) => {
  const { runId } = req.params;
  const run = pipelineRuns.get(runId);

  if (!run) {
    res.status(404).json({ error: 'Run not found' });
    return;
  }

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send current status
  res.write(`data: ${JSON.stringify({ type: 'status', ...run })}\n\n`);

  // Keep alive ping every 15s
  const interval = setInterval(() => {
    res.write(`: ping\n\n`);
  }, 15000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

export default router;
