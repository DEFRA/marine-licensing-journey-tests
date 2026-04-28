import { faker } from '@faker-js/faker'

export const TYPE_OF_ACTIVITY_NO_TOP_LEVEL_ERROR = 'Select the type of activity'

export const TYPE_OF_ACTIVITY_NO_SUB_LEVEL_ERROR = {
  Construction: 'Select the type of construction',
  Deposit: 'Select the type of deposit',
  Removal: 'Select the type of removal'
}
//
// Each top-level activity has sub-options. Each sub-option drives:
//   - the H1 on the What activity page
//   - the URL slug of the What activity page
//   - the row title on the Review site details Activity card
// The top-level drives:
//   - the no-selection error
//   - the Other-empty / Other-too-long errors
//   - the prefix used when displaying Other text on the review card

export const ACTIVITY_TYPES = {
  Construction: {
    radioId: 'activityType',
    radioLabel: 'Construction, alteration or improvement of any works',
    subOptions: [
      {
        radioId: 'activitySubTypeConstruction',
        label: 'Construction of new works',
        urlSlug: 'what-are-you-constructing',
        pageTitle: 'What are you constructing?',
        reviewRowTitle: "What you're constructing"
      },
      {
        radioId: 'activitySubTypeConstruction-2',
        label: 'Maintenance of existing works',
        urlSlug: 'what-are-you-maintaining',
        pageTitle: 'What are you maintaining?',
        reviewRowTitle: "What you're maintaining"
      },
      {
        radioId: 'activitySubTypeConstruction-3',
        label:
          'Alteration or improvement, including extending, of existing marine works',
        urlSlug: 'what-are-you-altering-or-improving',
        pageTitle: 'What are you altering or improving?',
        reviewRowTitle: "What you're altering or improving"
      }
    ],
    otherCheckboxId: 'activities-34',
    otherConditionalId: 'conditional-activities-34',
    errors: {
      noSelection: 'Select at least one type of structure',
      otherEmpty: 'Enter details of the other structures',
      otherTooLong:
        'Details of other structures must be 1000 characters or less'
    },
    otherPrefix: 'Other structures'
  },
  Deposit: {
    radioId: 'activityType-2',
    radioLabel: 'Deposit of any substance or object',
    subOptions: [
      {
        radioId: 'activitySubTypeDeposit',
        label: 'Continuation of existing deposit activity',
        urlSlug: 'what-deposit-activity-are-you-continuing',
        pageTitle: 'What deposit activity are you continuing?',
        reviewRowTitle: "What deposit activity you're continuing"
      },
      {
        radioId: 'activitySubTypeDeposit-2',
        label: 'Deposit of something new',
        urlSlug: 'what-new-deposit-activity-are-you-doing',
        pageTitle: 'What new deposit activity are you doing?',
        reviewRowTitle: "What new deposit activity you're doing"
      },
      {
        radioId: 'activitySubTypeDeposit-3',
        label: 'Replacing existing object',
        urlSlug: 'what-deposit-activity-replaces-an-existing-object',
        pageTitle:
          'What deposit activity are you doing that replaces an existing object?',
        reviewRowTitle:
          "What deposit activity you're doing that replaces an existing object"
      }
    ],
    otherCheckboxId: 'activities-27',
    otherConditionalId: 'conditional-activities-27',
    errors: {
      noSelection: 'Select at least one type of substance or object',
      // App message uses "deposits" — the ML-1228 AC table had a copy-paste typo
      // ("structures") that doesn't match what the implementation renders.
      otherEmpty: 'Enter details of the other deposits',
      otherTooLong: 'Details of other deposits must be 1000 characters or less'
    },
    otherPrefix: 'Other deposits'
  },
  Removal: {
    radioId: 'activityType-3',
    radioLabel: 'Removal of any substance or object',
    subOptions: [
      {
        radioId: 'activitySubTypeRemoval',
        label: 'One off first time removal',
        urlSlug: 'what-are-you-removing-for-the-first-time',
        pageTitle:
          'What are you removing for the first time on a one off basis?',
        reviewRowTitle:
          "What you're removing for the first time on a one off basis"
      },
      {
        radioId: 'activitySubTypeRemoval-2',
        label: 'Removal as part of an ongoing or routine activity',
        urlSlug: 'what-are-you-removing-on-an-ongoing-basis',
        pageTitle: 'What are you removing on an ongoing basis?',
        reviewRowTitle: "What you're removing on an ongoing basis"
      },
      {
        radioId: 'activitySubTypeRemoval-3',
        label: 'Removal for replacement',
        urlSlug: 'what-are-you-removing-for-replacement',
        pageTitle: 'What are you removing as part of replacement activity?',
        reviewRowTitle: "What you're removing as part of replacement activity"
      },
      {
        radioId: 'activitySubTypeRemoval-4',
        label: 'Removal for relocation',
        urlSlug: 'what-are-you-removing-for-relocation',
        pageTitle: 'What are you removing for relocation?',
        reviewRowTitle: "What you're removing for relocation"
      }
    ],
    otherCheckboxId: 'activities-43',
    otherConditionalId: 'conditional-activities-43',
    errors: {
      noSelection: 'Select at least one substance or object',
      otherEmpty: 'Enter details of the other substances or objects',
      otherTooLong:
        'Details of the other substances or objects must be 1000 characters or less'
    },
    otherPrefix: 'Other substances or objects'
  }
}

export const OTHER_TEXTAREA_ID = 'otherActivity'

export const TOP_LEVELS = Object.keys(ACTIVITY_TYPES)

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function pickRandomActivity({ topLevel } = {}) {
  const top = topLevel || pickRandom(TOP_LEVELS)
  const config = ACTIVITY_TYPES[top]
  const subOption = pickRandom(config.subOptions)
  return { topLevel: top, config, subOption }
}

export function pickDifferentTopLevel(currentTopLevel) {
  const others = TOP_LEVELS.filter((t) => t !== currentTopLevel)
  const next = pickRandom(others)
  return { topLevel: next, config: ACTIVITY_TYPES[next] }
}

export function generateOtherTextOver1000() {
  // Lorem text padded until it exceeds 1000 chars; the validation rule rejects
  // anything strictly greater than 1000.
  let text = ''
  while (text.length <= 1000) {
    text += `${faker.lorem.paragraph()} `
  }
  return text.trim()
}
