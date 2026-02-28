## ADDED Requirements

### Requirement: Node category definitions
The system SHALL define 5 node categories: `input`, `transform`, `generate`, `compose`, and `output`. Each category SHALL have a unique color scheme, icon, and label used for visual grouping in the toolbar and node rendering.

#### Scenario: Categories render with distinct colors
- **WHEN** nodes from different categories are displayed on the canvas
- **THEN** each node's border and header color SHALL match its category (input=green, transform=purple, generate=blue, compose=amber, output=red)

### Requirement: Input node types
The system SHALL provide 3 input node types for the MVP:

**TextPrompt**: No inputs, outputs `[text]`. Config: `text` (string, max 1000 chars), `placeholder` (string). Provides user-authored text/description.

**ImageUpload**: No inputs, outputs `[image]`. Config: `file` (File|null), `previewUrl` (string|null), `maxSizeMB` (number, default 10). Provides user-uploaded image with drag-drop and file picker.

**TemplatePreset**: No inputs, outputs `[text, style]`. Config: `template` (enum: ramadan-wishes, holiday-meme, ai-pet, custom-avatar, blank), `locale` (id|en). Emits pre-configured text and style values based on selected template.

#### Scenario: TextPrompt outputs text
- **WHEN** a user types "Ucapan Ramadan untuk keluarga" into a TextPrompt node
- **THEN** the node's text output port SHALL carry that string value for downstream consumption

#### Scenario: ImageUpload accepts drag-drop
- **WHEN** a user drags an image file onto the ImageUpload node's dropzone
- **THEN** the node SHALL display a thumbnail preview and its image output port SHALL carry the uploaded file data

#### Scenario: TemplatePreset emits dual outputs
- **WHEN** a user selects "ramadan-wishes" in a TemplatePreset node
- **THEN** the text output SHALL emit a Ramadan-themed prompt seed and the style output SHALL emit style config with Islamic art parameters

### Requirement: Transform node types
The system SHALL provide 2 transform node types for the MVP:

**PromptEnhancer**: Inputs `[text (required), style (optional)]`, outputs `[prompt]`. Config: `creativity` (precise|balanced|creative), `contentType` (wishes|meme|character|avatar|general), `tone` (formal|casual|funny|heartfelt), `language` (id|en|mixed). Runnable node that calls Qwen to transform raw text into an optimized image/video generation prompt.

**StyleConfig**: No inputs, outputs `[style]`. Config: `artStyle` (realistic|cartoon|anime|watercolor|pixel-art|islamic-art|pop-art|minimalist), `colorPalette` (string[]), `mood` (warm|cool|playful|elegant|spiritual|funny|cute), `culturalTheme` (ramadan|lebaran|natal|imlek|general|null).

#### Scenario: PromptEnhancer transforms user text into AI prompt
- **WHEN** PromptEnhancer receives text "kucing orange pakai kacamata" with creativity=creative
- **THEN** it SHALL call Qwen API and output an enhanced prompt like "A charming orange tabby cat wearing round glasses, sitting upright, detailed fur texture, warm lighting, whimsical illustration style"

#### Scenario: StyleConfig emits style object
- **WHEN** a user configures StyleConfig with artStyle=anime, mood=cute
- **THEN** the style output SHALL carry `{artStyle: "anime", mood: "cute", ...}` for downstream nodes

### Requirement: Generate node types
The system SHALL provide 2 generate node types for the MVP:

**ImageGenerator**: Inputs `[prompt (required), style (optional), image (optional)]`, outputs `[image]`. Config: `mode` (text2img|img2img, auto-detected from image port connection), `dimensions` (square-1024|portrait-768x1024|landscape-1024x768|story-576x1024), `steps` (number), `seed` (number|null). Runnable node that calls Wan image model.

**VideoGenerator**: Inputs `[prompt (required), style (optional), image (optional)]`, outputs `[video]`. Config: `mode` (text2video|img2video, auto-detected), `duration` (3s|5s|10s), `resolution` (480p|720p), `fps` (24|30). Runnable node that calls Wan video model.

#### Scenario: ImageGenerator auto-detects mode
- **WHEN** an ImageGenerator node has an image input port connected
- **THEN** its mode config SHALL auto-switch to `img2img`

#### Scenario: ImageGenerator produces image from prompt
- **WHEN** ImageGenerator receives a prompt and the user clicks "Run"
- **THEN** it SHALL call the Wan image API and display a thumbnail of the generated image in the node, and its image output port SHALL carry the result

#### Scenario: VideoGenerator produces video
- **WHEN** VideoGenerator receives a prompt and the user clicks "Run"
- **THEN** it SHALL call the Wan video API and display a video thumbnail in the node, and its video output port SHALL carry the result

### Requirement: Compose node type
The system SHALL provide 1 compose node type for the MVP:

**TextOverlay**: Inputs `[image (required), text (optional)]`, outputs `[image]`. Config: `text` (string, can also receive from text port), `position` (top|center|bottom|custom), `font` (inter|impact|arabic-display|comic-neue), `fontSize` (number), `fontColor` (string), `stroke` (boolean), `effect` (none|shadow|glow|gradient). Composites text onto image client-side using Canvas API.

#### Scenario: TextOverlay renders text on image
- **WHEN** a TextOverlay node receives an image and has text configured as "Ramadan Kareem"
- **THEN** it SHALL composite the text onto the image at the configured position and pass the composited image to its output port

#### Scenario: TextOverlay receives text from port
- **WHEN** a TextOverlay node has both a text port connection and manual text config
- **THEN** the port-connected text SHALL take precedence over the manually configured text

### Requirement: Output node types
The system SHALL provide 2 output node types for the MVP:

**Preview**: Inputs `[media (required)]`, outputs `[media]`. Config: `preset` (ig-square|ig-story|tiktok|twitter|whatsapp-status|custom), `width` (number), `height` (number), `backgroundColor` (string), `fit` (cover|contain|fill). Displays content at target dimensions. Pass-through output allows chaining to Export.

**Export**: Inputs `[media (required)]`, no outputs. Config: `format` (png|jpg|webp|mp4|gif), `quality` (1-100), `shareTarget` (download|whatsapp|clipboard). Terminal node that enables content download and sharing.

#### Scenario: Preview shows image at IG Story dimensions
- **WHEN** Preview receives an image with preset=ig-story
- **THEN** it SHALL display the image at 1080x1920 with the configured fit mode

#### Scenario: Export downloads as PNG
- **WHEN** a user clicks "Download" on an Export node with format=png
- **THEN** the browser SHALL download the upstream media as a PNG file

### Requirement: Node compact view
Each node SHALL render as a compact card (180-220px wide) showing: category-colored header with icon and title, subtitle with key config summary, optional content preview area, and typed port handles. Nodes SHALL be clickable to open the detail drawer panel for full configuration.

#### Scenario: Compact node shows summary
- **WHEN** an ImageGenerator node is rendered on canvas with dimensions=square-1024
- **THEN** it SHALL display "🖼️ Image Generator" as title, "Square 1024×1024" as subtitle, and a thumbnail of the last generated image if available

### Requirement: Node drawer panels
Each node type SHALL have a dedicated drawer panel that opens when the node is clicked. The drawer panel SHALL display all configurable properties with appropriate form controls (inputs, selectors, sliders, toggles). Runnable nodes SHALL display a "Run" button in their drawer. The drawer SHALL show real-time node output when available.

#### Scenario: PromptEnhancer drawer shows run button
- **WHEN** a user clicks on a PromptEnhancer node
- **THEN** the drawer SHALL open showing creativity selector, content type selector, tone selector, language selector, and a "▶ Run" button
