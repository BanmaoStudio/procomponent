export default async function loadComponent(filePath: string) {
  const modules = import.meta.glob('/src/examples/procomponents/**/*.vue', { eager: true })

  // Ensure the file path matches exactly with the glob pattern
  const componentName = Object.keys(modules).find(key => key === filePath)
  if (!componentName) {
    throw new Error(`Component not found for file path: ${filePath}`)
  }

  const component = modules[componentName]
  return (component as any).default
}
