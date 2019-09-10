import { JsonController, Get, Post, Put, Param, Body, HttpCode } from "routing-controllers"
import pagesById, { Page } from "./data"

type PageList = { pages: Page[] }

@JsonController()
export default class PageController {
  @Get("/pages")
  allPages(): PageList {
    return {
      pages: [...Object.keys(pagesById).map(id => pagesById[id])]
    }
  }

  @Get("/pages/:id")
  getPage(
    @Param("id") id: number
  ): Page {
    return pagesById[id]
  }

  @Post("/pages")
  @HttpCode(201)
  createPage(
    @Body() body: Page
  ): Page {
    console.log("Incoming PUT body param:", body)
    return body
  }

  @Put("/pages/:id")
  updatePage(
    @Param("id") id: number,
    @Body() body: Partial<Page>
  ): Page {
    console.log("Incoming PUT body param:", body)
    return pagesById[id]
  }
}