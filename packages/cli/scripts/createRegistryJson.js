const fs = require('fs');
const path = require('path');

// Read the registrybuilder.json file
const registryBuilderPath = path.join(__dirname, 'regsitrybuilder.json');
const registryBuilder = JSON.parse(fs.readFileSync(registryBuilderPath, 'utf8'));

// Function to read file content
function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Function to process components
function processComponents(components) {
  return components.map(component => {
    const processedFiles = component.files.map(file => {
      const contentFilePath = path.join(__dirname, '..', '..', '..', 'templates', 'basic', 'src', 'components', 'ui',  file.contentFile);
      return {
        name: file.name,
        content: readFileContent(contentFilePath)
      };
    });

    return {
      ...component,
      files: processedFiles
    };
  });
}

// Process regular components
const components = processComponents(registryBuilder.components);

// Process hidden components
const hiddenComponents = processComponents(registryBuilder.hiddenComponents);

// Create the final registry object
const registry = {
  components: components,
  hiddenComponents: hiddenComponents
};

// Write the registry.json file
const registryPath = path.join(__dirname, '..', 'src', 'registry', 'registry.json');
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

console.log('registry.json has been created successfully.');
