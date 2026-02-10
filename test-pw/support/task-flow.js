import { navigateAndAuthenticate } from './navigation.js'
import { completeSiteDetailsFlow } from './site-details-flow.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'
import PublicRegisterPage from '../pages/public.register.page.js'
import ConfirmationPage from '../pages/confirmation.page.js'

export async function completeAllTasks(world) {
  await navigateAndAuthenticate(world, '/')

  const projectPage = new ProjectNamePage(world.page)
  await projectPage.enterProjectName(world.data.projectName)
  world.data.projectNameTaskCompleted = true

  const taskList = new TaskListPage(world.page)
  await taskList.selectTask('Site details')
  await completeSiteDetailsFlow(world.page, world.data.siteDetails)
  await world.page.locator('button:has-text("Continue")').click()
  await world.page.waitForLoadState('load')

  await taskList.selectTask('Sharing your project information publicly')
  const publicRegister = new PublicRegisterPage(world.page)
  await publicRegister.completeAndSave(
    world.data.publicRegister.consent,
    world.data.publicRegister.reason
  )
}

export async function completeTasksFromCurrentPage(world) {
  const projectPage = new ProjectNamePage(world.page)
  await projectPage.enterProjectName(world.data.projectName)
  world.data.projectNameTaskCompleted = true

  const taskList = new TaskListPage(world.page)
  await taskList.selectTask('Site details')
  await completeSiteDetailsFlow(world.page, world.data.siteDetails)
  await world.page.locator('button:has-text("Continue")').click()
  await world.page.waitForLoadState('load')

  await taskList.selectTask('Sharing your project information publicly')
  const publicRegister = new PublicRegisterPage(world.page)
  await publicRegister.completeAndSave(
    world.data.publicRegister.consent,
    world.data.publicRegister.reason
  )
}

export async function navigateAndCompleteSiteDetailsToReview(world) {
  await navigateAndAuthenticate(world, '/')

  const projectPage = new ProjectNamePage(world.page)
  await projectPage.enterProjectName(world.data.projectName)
  world.data.projectNameTaskCompleted = true

  const taskList = new TaskListPage(world.page)
  await taskList.selectTask('Site details')
  await completeSiteDetailsFlow(world.page, world.data.siteDetails)
}

export async function clickReviewAndSend(page) {
  const taskList = new TaskListPage(page)
  await taskList.getReviewAndSendButton().click()
  await page.waitForLoadState('load')
}

export async function clickConfirmAndSend(page) {
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
  await page.waitForLoadState('load')
}

export async function submitNotification(world) {
  await completeAllTasks(world)
  await clickReviewAndSend(world.page)
  await clickConfirmAndSend(world.page)

  const confirmation = new ConfirmationPage(world.page)
  const reference = await confirmation.getApplicationReference()

  if (!world.data.completedExemptions) {
    world.data.completedExemptions = []
  }

  world.data.completedExemptions.push({
    projectName: world.data.projectName,
    applicationReference: reference,
    iatContext: world.data.iatContext
  })

  world.data.applicationReference = reference
}
