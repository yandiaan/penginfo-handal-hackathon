## ADDED Requirements

### Requirement: Template preset definitions
The system SHALL provide 4 built-in template presets: `ramadan-wishes`, `holiday-meme`, `ai-pet`, and `custom-avatar`, plus a `blank` preset for manual pipeline building. Each template SHALL define: a display name, description, thumbnail image, a set of pre-configured nodes with positions, edges connecting them, and default config values for each node.

#### Scenario: Ramadan Wishes template
- **WHEN** a user selects the "Ramadan Wishes" template
- **THEN** the canvas SHALL populate with: TemplatePreset(ramadan) → PromptEnhancer → ImageGenerator, TextPrompt → TextOverlay ← ImageGenerator, TextOverlay → Preview → Export, with all nodes pre-configured for Ramadan content

#### Scenario: Holiday Meme template
- **WHEN** a user selects the "Holiday Memes" template
- **THEN** the canvas SHALL populate with: TextPrompt → PromptEnhancer → ImageGenerator → TextOverlay → Preview → Export, with StyleConfig(pop-art, funny) connected to PromptEnhancer and ImageGenerator

#### Scenario: AI Pet template
- **WHEN** a user selects the "AI Pet" template
- **THEN** the canvas SHALL populate with: TextPrompt → PromptEnhancer → ImageGenerator → Preview → Export, with StyleConfig(cartoon, cute) connected to PromptEnhancer

#### Scenario: Custom Avatar template
- **WHEN** a user selects the "Custom Avatar" template
- **THEN** the canvas SHALL populate with: ImageUpload + TextPrompt → PromptEnhancer → ImageGenerator(img2img) → Preview → Export, with StyleConfig(anime) connected

### Requirement: Template selection UI
The `/templates` page SHALL display a gallery of available templates as visual cards. Each card SHALL show: template name, brief description, example output thumbnail, and number of nodes. Clicking a card SHALL navigate to the canvas page with the selected template's nodes and edges pre-populated.

#### Scenario: Template gallery display
- **WHEN** a user navigates to the `/templates` page
- **THEN** they SHALL see a grid of template cards with visual previews for each of the 4 templates plus a "Blank Canvas" option

#### Scenario: Template loads into canvas
- **WHEN** a user clicks on a template card
- **THEN** the canvas page SHALL open with all template nodes placed, connected, and pre-configured, ready for the user to customize and run

### Requirement: Template customization
After loading a template, users SHALL be able to modify any node's configuration, add new nodes, remove template nodes, and rearrange connections. The template serves as a starting point, not a locked pipeline.

#### Scenario: User modifies template node
- **WHEN** a user loads the Ramadan Wishes template and changes the StyleConfig artStyle from "islamic-art" to "watercolor"
- **THEN** the change SHALL be preserved and used when the pipeline is executed

#### Scenario: User adds node to template
- **WHEN** a user loads a template and adds a new TextOverlay node between ImageGenerator and Preview
- **THEN** the new node SHALL be connectable and functional within the pipeline

### Requirement: Blank canvas option
The system SHALL provide a "Blank Canvas" option that loads an empty canvas with no pre-populated nodes. Users SHALL build their pipeline from scratch using the toolbar's node picker.

#### Scenario: Blank canvas starts empty
- **WHEN** a user selects "Blank Canvas"
- **THEN** the canvas SHALL be empty with no nodes or edges, and the toolbar SHALL be available for adding nodes
