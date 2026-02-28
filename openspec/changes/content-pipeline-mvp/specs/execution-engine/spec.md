## ADDED Requirements

### Requirement: Node execution states
Each node SHALL maintain an execution state from the set: `idle`, `ready`, `running`, `done`, `error`. State transitions: `idle` → `ready` (when all required input ports are satisfied), `ready` → `running` (when execution starts), `running` → `done` (on success), `running` → `error` (on failure), `done` → `ready` (when upstream re-runs, marking outputs stale). The node's visual border/glow SHALL reflect its current state.

#### Scenario: Node becomes ready when inputs satisfied
- **WHEN** all required input ports of a node have connections from upstream nodes in `done` state
- **THEN** the node's state SHALL transition to `ready` and display a yellow glow indicator

#### Scenario: Node shows running state
- **WHEN** a runnable node starts executing
- **THEN** it SHALL transition to `running` state, display a blue spinner animation, and show progress percentage if available

#### Scenario: Node shows error state
- **WHEN** a node's execution fails
- **THEN** it SHALL transition to `error` state, display a red glow, and store the error message accessible via the drawer

#### Scenario: Downstream nodes become stale on re-run
- **WHEN** an upstream node is re-executed and transitions to `done`
- **THEN** all direct downstream nodes that were previously `done` SHALL transition back to `ready` (stale)

### Requirement: Topology sort for pipeline execution
The system SHALL perform a topological sort of the node graph before pipeline execution. The sort SHALL determine valid execution order respecting edge dependencies. If the graph contains a cycle, the system SHALL reject execution and display an error message identifying the cycle.

#### Scenario: Linear pipeline executes in order
- **WHEN** a pipeline has nodes A → B → C and user clicks "Run Pipeline"
- **THEN** the system SHALL execute A first, then B after A completes, then C after B completes

#### Scenario: Parallel branches execute concurrently
- **WHEN** a pipeline has A → B and A → C (B and C are independent)
- **THEN** after A completes, B and C SHALL execute concurrently

#### Scenario: Cycle detection rejects execution
- **WHEN** a pipeline has A → B → A (cycle)
- **THEN** the system SHALL NOT execute and SHALL display "Pipeline contains a cycle" error

### Requirement: Full pipeline run
The system SHALL provide a "▶ Run Pipeline" button in the toolbar. When clicked, the system SHALL: (1) validate the graph has no cycles, (2) validate all input nodes have required data configured, (3) execute nodes in topological order, (4) stream progress via SSE to update node states in real-time, (5) stop execution on first error with option to retry from failed node.

#### Scenario: Successful full pipeline run
- **WHEN** a user clicks "Run Pipeline" on a valid pipeline with all inputs configured
- **THEN** each node SHALL transition through states (ready → running → done) in dependency order, and the final output node SHALL contain the generated content

#### Scenario: Pipeline stops on error
- **WHEN** a node fails during pipeline execution (e.g., API error)
- **THEN** that node SHALL transition to `error`, all downstream nodes SHALL remain in their previous state, and the pipeline SHALL stop with an error summary

#### Scenario: Pipeline validates before running
- **WHEN** a user clicks "Run Pipeline" but an input node has no data configured
- **THEN** the system SHALL NOT start execution and SHALL highlight the unconfigured node with an error indicator

### Requirement: Per-node execution
Runnable nodes (PromptEnhancer, ImageGenerator, VideoGenerator) SHALL display a "▶ Run" button on the node compact view and in the drawer panel. Clicking it SHALL execute only that node using its current input port data. Per-node run SHALL only be available when the node is in `ready` state (all required inputs satisfied).

#### Scenario: Run single node
- **WHEN** a user clicks "Run" on a PromptEnhancer node that has text input from a done upstream node
- **THEN** only the PromptEnhancer SHALL execute, transitioning to running → done, without affecting other nodes

#### Scenario: Run button disabled when not ready
- **WHEN** a runnable node has unsatisfied required input ports
- **THEN** the "Run" button SHALL be disabled with a tooltip "Connect required inputs first"

### Requirement: Data propagation through edges
When a node completes execution, its output data SHALL be stored and made available to downstream connected nodes via the edge connections. Each edge SHALL carry the output data from its source port to its target port. Downstream nodes SHALL read their input data from all connected source ports.

#### Scenario: Text flows from TextPrompt to PromptEnhancer
- **WHEN** TextPrompt has text "Ramadan wishes" and is connected to PromptEnhancer's text input
- **THEN** PromptEnhancer SHALL receive "Ramadan wishes" as its text input when executed

#### Scenario: Multiple inputs merge at node
- **WHEN** ImageGenerator has prompt from PromptEnhancer, style from StyleConfig, and image from ImageUpload all connected
- **THEN** ImageGenerator SHALL receive all three inputs and use them according to its execution logic

### Requirement: SSE progress streaming
The server SHALL provide a `GET /api/pipeline/status/:runId` SSE endpoint that streams execution progress events. Events SHALL include: `node:state-change` (nodeId, newState), `node:progress` (nodeId, percentage), `node:output` (nodeId, outputPreview), `pipeline:complete`, `pipeline:error`. The frontend SHALL consume these events to update node states in real-time.

#### Scenario: Frontend receives real-time state updates
- **WHEN** a pipeline is running on the server
- **THEN** the frontend SHALL receive SSE events and update each node's visual state within 500ms of the actual state change

#### Scenario: Progress percentage for image generation
- **WHEN** ImageGenerator is running
- **THEN** the SSE stream SHALL emit `node:progress` events with percentage (0-100) that the frontend displays as a progress bar on the node
