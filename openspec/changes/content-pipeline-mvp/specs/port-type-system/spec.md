## ADDED Requirements

### Requirement: Port type definitions
The system SHALL define 6 port data types: `text`, `prompt`, `image`, `video`, `style`, and `media`. Each port type SHALL have a unique identifier, display color, and human-readable label. The `media` type SHALL be a union type that accepts both `image` and `video`.

#### Scenario: Port types are visually distinct
- **WHEN** a node is rendered on the canvas
- **THEN** each port handle SHALL be colored according to its data type (text=#4ade80, prompt=#a78bfa, image=#60a5fa, video=#f472b6, style=#f59e0b, media=#e2e8f0)

### Requirement: Node port schema declaration
Each node type SHALL declare its input and output ports as an array of typed port definitions. Each port definition SHALL include: `id` (unique within the node), `type` (one of the 6 port types), `label` (display name), and `required` (boolean). A node MAY have zero or more input ports and zero or more output ports.

#### Scenario: Node declares typed ports
- **WHEN** a node type `ImageGenerator` is registered
- **THEN** it SHALL declare input ports `[{id: "prompt", type: "prompt", required: true}, {id: "style", type: "style", required: false}, {id: "image", type: "image", required: false}]` and output port `[{id: "output", type: "image", required: true}]`

### Requirement: Connection validation on drag
The system SHALL validate port type compatibility when a user drags an edge from a source port to a target port. A connection SHALL be valid only if the source port type is compatible with the target port type according to the compatibility matrix.

#### Scenario: Compatible connection allowed
- **WHEN** a user drags an edge from a `text` output port to a `text` input port
- **THEN** the target port SHALL show a green glow indicator and the connection SHALL be created on release

#### Scenario: Incompatible connection rejected
- **WHEN** a user drags an edge from a `prompt` output port to an `image` input port
- **THEN** the target port SHALL show a red indicator and the connection SHALL NOT be created on release

#### Scenario: Media union type accepts image and video
- **WHEN** a user drags an edge from an `image` output port to a `media` input port
- **THEN** the connection SHALL be accepted as valid

#### Scenario: Media union type accepts video
- **WHEN** a user drags an edge from a `video` output port to a `media` input port
- **THEN** the connection SHALL be accepted as valid

### Requirement: Port compatibility matrix
The system SHALL enforce the following compatibility rules: `text` → `text` inputs; `prompt` → `prompt` inputs; `image` → `image`, `media` inputs; `video` → `video`, `media` inputs; `style` → `style` inputs; `media` → `media` inputs. All other cross-type connections SHALL be rejected.

#### Scenario: Text cannot connect to image input
- **WHEN** a user attempts to connect a `text` output to an `image` input
- **THEN** the connection SHALL be rejected

#### Scenario: Style connects to style
- **WHEN** a user connects a `style` output to a `style` input
- **THEN** the connection SHALL be accepted

### Requirement: Multiple named ports per node
A node SHALL support multiple input ports and multiple output ports, each with a distinct `id`. Ports SHALL be rendered as separate handles on the node, vertically distributed on the left (inputs) and right (outputs) sides. Each handle SHALL display its label on hover.

#### Scenario: TemplatePreset has dual outputs
- **WHEN** a `TemplatePreset` node is rendered
- **THEN** it SHALL display two output handles on the right side: one for `text` and one for `style`, each color-coded by type

#### Scenario: ImageGenerator has triple inputs
- **WHEN** an `ImageGenerator` node is rendered
- **THEN** it SHALL display three input handles on the left side: `prompt` (required), `style` (optional), and `image` (optional), each color-coded by type
