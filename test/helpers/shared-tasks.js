import {
  ApplyForExemption,
  CompleteActivityDates,
  CompleteActivityDescription,
  CompleteProjectName,
  CompletePublicRegisterTask,
  CompleteSiteDetails,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

/**
 * Completes all tasks on the task list with circular site details
 * @param {Actor} actor - The actor performing the tasks
 * @param {string} coordinateSystem - Either 'WGS84' or 'OSGB36'
 */
export async function completeAllTasksWithCircularSite(
  actor,
  coordinateSystem
) {
  const exemptionFactory =
    coordinateSystem === 'WGS84'
      ? ApplyForExemption.withAllTasksCompleted().andSiteDetails.withCircleWGS84()
      : ApplyForExemption.withAllTasksCompleted().andSiteDetails.withCircleOSGB36()

  actor.intendsTo(exemptionFactory)
  await actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
  await actor.attemptsTo(CompleteProjectName.now())
  await actor.attemptsTo(SelectTheTask.withName('Activity description'))
  await actor.attemptsTo(CompleteActivityDescription.now())
  await actor.attemptsTo(SelectTheTask.withName('Activity dates'))
  await actor.attemptsTo(CompleteActivityDates.now())
  await actor.attemptsTo(SelectTheTask.withName('Site details'))
  await actor.attemptsTo(CompleteSiteDetails.andSave())
  await actor.attemptsTo(SelectTheTask.withName('Public register'))
  await actor.attemptsTo(CompletePublicRegisterTask.andSave())
}
