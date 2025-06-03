export const ERROR_MESSAGES = {
  MISSING_EXEMPTION: (taskName) =>
    `Exemption data must be initialized before completing ${taskName}`,
  MISSING_BROWSER: 'Browser instance is required for BrowseTheWeb ability',
  MISSING_DATA: (dataType, taskName) =>
    `${dataType} data must be set before completing ${taskName}`,
  CANNOT_REPLACE_EXEMPTION: (key) =>
    `Cannot replace stored ${key} data. Use updates() method instead.`,
  CANNOT_UPDATE_UNINITIALIZED:
    'Cannot update exemption data that has not been initialized',
  MEMORY_NOT_FOUND: (actorName, key) =>
    `Actor '${actorName}' tried to recall '${key}' but it wasn't in memory`,
  INVALID_COORDINATES_METHOD: 'Invalid coordinates input method',
  FILE_UPLOAD_NOT_IMPLEMENTED: 'File upload flow not implemented',
  ABSTRACT_CLASS_INSTANTIATION:
    'Ability is an abstract class and cannot be instantiated directly.',
  MISSING_PERFORM_AS:
    'Tasks and interactions must implement the performAs method.',
  LOCATOR_UNDEFINED: 'Locator cannot be null or undefined',
  LOCATOR_NOT_FOUND: (primary, fallback) =>
    `Neither primary locator '${primary}' nor fallback locator '${fallback}' could be found`
}
