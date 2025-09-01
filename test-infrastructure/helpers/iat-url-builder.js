/**
 * Constructs a URL with IAT query parameters
 * @param {string} baseUrl - The base URL to append parameters to
 * @param {Object} iatContext - The IAT context data
 * @param {Object} iatContext.activityType - Activity type with code, display, and supportsPurpose
 * @param {Object} iatContext.articleCode - Article code with code and link
 * @param {string|null} iatContext.activityPurpose - Activity purpose (null for unsupported types)
 * @param {string} iatContext.pdfUrl - PDF download URL
 * @returns {string} The constructed URL with query parameters
 */
export function constructIatUrl(baseUrl, iatContext) {
  if (!iatContext) {
    return baseUrl
  }

  const params = new URLSearchParams({
    ACTIVITY_TYPE: iatContext.activityType.code,
    ARTICLE: iatContext.articleCode.code,
    pdfDownloadUrl: iatContext.pdfUrl
  })

  if (iatContext.activityType.supportsPurpose && iatContext.activityPurpose) {
    const subtypeKey = getActivitySubtypeKey(iatContext.activityType.code)
    if (subtypeKey) {
      params.set(subtypeKey, iatContext.activityPurpose)
    }
  }

  return `${baseUrl}?${params.toString()}`
}

/**
 * Gets the activity subtype parameter key for a given activity type code
 * @param {string} activityTypeCode - The activity type code (CON, DEPOSIT, etc.)
 * @returns {string|undefined} The corresponding subtype parameter key
 */
function getActivitySubtypeKey(activityTypeCode) {
  const subtypeMap = {
    CON: 'EXE_ACTIVITY_SUBTYPE_CONSTRUCTION',
    DEPOSIT: 'EXE_ACTIVITY_SUBTYPE_DEPOSIT',
    REMOVAL: 'EXE_ACTIVITY_SUBTYPE_REMOVAL',
    DREDGE: 'EXE_ACTIVITY_SUBTYPE_DREDGING'
  }
  return subtypeMap[activityTypeCode]
}
