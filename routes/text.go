package routes

import (
	"time"

	"github.com/a-paudel/pastebin/models"

	"github.com/dustin/go-humanize"
	"github.com/labstack/echo/v4"
)

func RegisterTextRoutes(app *echo.Echo) {
	router := app.Group("")

	router.GET("", createTextGet)
	router.POST("", createTextPost)
	router.GET("/:code", viewText)
	router.GET("/:code/raw", viewTextRaw)
}

func createTextGet(c echo.Context) error {
	return c.Render(200, "create.html", nil)
}

func createTextPost(c echo.Context) error {
	var input models.TextInput
	var err = c.Bind(&input)
	if err != nil {
		return c.String(400, err.Error())
	}

	var text models.Text
	text.DeleteExpired()
	text.Create(input.Content)

	var url = c.Echo().URL(viewText, text.Code)
	return c.Redirect(302, url)
}

func viewText(c echo.Context) error {
	var code = c.Param("code")
	var text models.Text
	text.DeleteExpired()
	err := models.Db.Where("code = ?", code).First(&text).Error
	if err != nil {
		return c.String(404, "text not found")
	}

	var rawLink = c.Echo().URL(viewTextRaw, text.Code)
	var createLink = "/"
	var expiryDate = text.CreatedAt.Add(time.Hour * 24)
	var data = map[string]interface{}{
		"text":       text,
		"rawLink":    rawLink,
		"createLink": createLink,
		"expiryDate": humanize.Time(expiryDate),
	}

	return c.Render(200, "view.html", data)
}

func viewTextRaw(c echo.Context) error {
	var code = c.Param("code")
	var text models.Text
	text.DeleteExpired()
	err := models.Db.Where("code = ?", code).First(&text).Error
	if err != nil {
		return c.String(404, "text not found")
	}

	return c.String(200, text.Content)
}
