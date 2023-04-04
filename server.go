package main

import (
	"pastebin/routes"
	"pastebin/templates"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func startServer() {
	app := echo.New()
	app.Pre(middleware.RemoveTrailingSlash())
	app.Pre(middleware.HTTPSNonWWWRedirect())

	app.Use(middleware.Logger())
	app.Use(middleware.Recover())

	templates.RegisterTemplates(app)

	routes.RegisterTextRoutes(app)
	app.Start(":8000")
}
