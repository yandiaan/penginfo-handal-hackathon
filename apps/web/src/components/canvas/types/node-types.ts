import type { Node } from '@xyflow/react';

// Node categories
export type NodeCategory =
  | 'input'
  | 'generator'
  | 'modifier'
  | 'character'
  | 'variant'
  | 'output';

// All custom node type identifiers
export type CustomNodeType =
  | 'trendSeed'
  | 'textInput'
  | 'aiTextGenerator'
  | 'humorStyle'
  | 'variantBatch'
  | 'canvasRender'
  | 'export';

// Base node data interface
export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  isExpanded: boolean;
}

// TrendSeed Node
export interface TrendSeedConfig {
  topic: string;
  keywords: string[];
  trending: boolean;
}

export interface TrendSeedData extends BaseNodeData {
  config: TrendSeedConfig;
}

// TextInput Node
export interface TextInputConfig {
  text: string;
  maxLength: number;
}

export interface TextInputData extends BaseNodeData {
  config: TextInputConfig;
}

// AITextGenerator Node
export interface AITextGeneratorConfig {
  prompt: string;
  temperature: number;
  maxTokens: number;
  outputCount: number;
  generatedOutputs: string[];
}

export interface AITextGeneratorData extends BaseNodeData {
  config: AITextGeneratorConfig;
}

// HumorStyle Node
export type HumorStyleType = 'receh' | 'satir' | 'relatable' | 'dark' | 'absurd';

export interface HumorStyleConfig {
  style: HumorStyleType;
  intensity: number;
  language: 'id' | 'en';
}

export interface HumorStyleData extends BaseNodeData {
  config: HumorStyleConfig;
}

// VariantBatch Node
export interface VariantBatchConfig {
  count: number;
  randomize: boolean;
  seed: number | null;
}

export interface VariantBatchData extends BaseNodeData {
  config: VariantBatchConfig;
}

// CanvasRender Node
export type LayoutType = 'top-bottom' | 'side-by-side' | 'overlay';
export type DimensionPreset = 'instagram-square' | 'instagram-story' | 'tiktok' | 'twitter' | 'custom';

export interface CanvasRenderConfig {
  layout: LayoutType;
  preset: DimensionPreset;
  width: number;
  height: number;
  backgroundColor: string;
}

export interface CanvasRenderData extends BaseNodeData {
  config: CanvasRenderConfig;
}

// Export Node
export type ExportFormat = 'png' | 'jpg' | 'gif' | 'mp4';

export interface ExportConfig {
  format: ExportFormat;
  quality: number;
  shareLink: string | null;
}

export interface ExportData extends BaseNodeData {
  config: ExportConfig;
}

// Union type of all node data
export type CustomNodeData =
  | TrendSeedData
  | TextInputData
  | AITextGeneratorData
  | HumorStyleData
  | VariantBatchData
  | CanvasRenderData
  | ExportData;

// Typed node definitions
export type TrendSeedNode = Node<TrendSeedData, 'trendSeed'>;
export type TextInputNode = Node<TextInputData, 'textInput'>;
export type AITextGeneratorNode = Node<AITextGeneratorData, 'aiTextGenerator'>;
export type HumorStyleNode = Node<HumorStyleData, 'humorStyle'>;
export type VariantBatchNode = Node<VariantBatchData, 'variantBatch'>;
export type CanvasRenderNode = Node<CanvasRenderData, 'canvasRender'>;
export type ExportNode = Node<ExportData, 'export'>;

// Union of all custom nodes
export type CustomNode =
  | TrendSeedNode
  | TextInputNode
  | AITextGeneratorNode
  | HumorStyleNode
  | VariantBatchNode
  | CanvasRenderNode
  | ExportNode;

// Default configs for each node type
export const defaultConfigs = {
  trendSeed: {
    topic: '',
    keywords: [],
    trending: true,
  } satisfies TrendSeedConfig,

  textInput: {
    text: '',
    maxLength: 500,
  } satisfies TextInputConfig,

  aiTextGenerator: {
    prompt: '',
    temperature: 0.7,
    maxTokens: 150,
    outputCount: 3,
    generatedOutputs: [],
  } satisfies AITextGeneratorConfig,

  humorStyle: {
    style: 'receh' as HumorStyleType,
    intensity: 50,
    language: 'id' as const,
  } satisfies HumorStyleConfig,

  variantBatch: {
    count: 5,
    randomize: true,
    seed: null,
  } satisfies VariantBatchConfig,

  canvasRender: {
    layout: 'top-bottom' as LayoutType,
    preset: 'instagram-square' as DimensionPreset,
    width: 1080,
    height: 1080,
    backgroundColor: '#ffffff',
  } satisfies CanvasRenderConfig,

  export: {
    format: 'png' as ExportFormat,
    quality: 90,
    shareLink: null,
  } satisfies ExportConfig,
} as const;
