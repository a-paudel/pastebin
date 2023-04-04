package templates

import (
	"embed"
	"html/template"
	"io"
	"io/fs"
	"strings"

	"github.com/labstack/echo/v4"
)

//go:embed www/*
var EmbeddedTemplates embed.FS

type EchoTemplate struct {
	templates map[string]*template.Template
}

func (t *EchoTemplate) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates[name].ExecuteTemplate(w, "base.html", data)
	// return t.templates.ExecuteTemplate(w, name, data)
}

func RegisterTemplates(app *echo.Echo) {
	var templates = make(map[string]*template.Template)

	var subDir, err = fs.Sub(EmbeddedTemplates, "www")
	if err != nil {
		panic(err)
	}

	// template.Must(templates.New("base.html").ParseFS(EmbeddedTemplates, "www/base.html"))
	err = fs.WalkDir(subDir, ".", func(path string, d fs.DirEntry, err error) error {
		if !strings.HasSuffix(path, ".html") {
			return nil
		}
		if d.IsDir() {
			return nil
		}
		if path == "base.html" {
			return nil
		}
		templates[path] = template.Must(template.ParseFS(subDir, path, "base.html"))
		return nil
	})

	if err != nil {
		panic(err)
	}

	app.Renderer = &EchoTemplate{
		templates: templates,
	}
}
