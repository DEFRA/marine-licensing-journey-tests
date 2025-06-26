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

export async function completeAllTasksWithCircularSite(
  actor,
  coordinateSystem
) {
  const exemptionFactory =
    coordinateSystem === 'WGS84'
      ? ApplyForExemption.withAllTasksCompleted().andSiteDetails.withCircleWGS84()
      : ApplyForExemption.withAllTasksCompleted().andSiteDetails.withCircleOSGB36()

  actor.intendsTo(exemptionFactory)
  await actor.attemptsTo(Navigate.toTheMarineLicensingApp())
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
