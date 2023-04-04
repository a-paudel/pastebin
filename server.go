package main

import (
	"github.com/a-paudel/pastebin/routes"
	"github.com/a-paudel/pastebin/templates"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func startServer() {
	app := echo.New()
	app.Pre(middleware.RemoveTrailingSlash())
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())

	templates.RegisterTemplates(app)

	routes.RegisterTextRoutes(app)
	app.Start(":8000")
}
