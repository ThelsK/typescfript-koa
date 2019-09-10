import { JsonController, Get, Post, Put, Param, Body, HttpCode, NotFoundError, Authorized } from "routing-controllers"
import Page from "./entity"

@JsonController()
export default class PageController {
  @Get("/pages")
  allPages() {
    return Page.find()
      .then(pages => ({ pages }))
      .catch(console.error)
  }

  @Get("/pages/:id")
  getPage(
    @Param("id") id: number
  ) {
    return Page.findOne(id)
  }

  @Authorized()
  @Post("/pages")
  @HttpCode(201)
  createPage(
    @Body() page: Page
  ) {
    return page.save()
  }

  @Authorized()
  @Put("/pages/:id")
  async updatePage(
    @Param("id") id: number,
    @Body() update: Partial<Page>
  ) {
    return Page.findOne(id).then(page => {
      if (!page) throw new NotFoundError("Cannot find page")
      return Page.merge(page, update).save()
    })
  }
}