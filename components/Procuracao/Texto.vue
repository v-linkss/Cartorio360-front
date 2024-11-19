<template>
    <ClientOnly>
      <v-container class="mt-5">
        <input class="mb-5" type="file" accept=".docx" @change="importWordFile" />
        <div class="main-container">
          <div
            class="editor-container editor-container_document-editor editor-container_include-style"
            ref="editorContainerElement"
          >
            <div
              class="editor-container__menu-bar"
              ref="editorMenuBarElement"
            ></div>
            <div
              class="editor-container__toolbar"
              ref="editorToolbarElement"
            ></div>
            <div class="editor-container__editor-wrapper">
              <div class="editor-container__editor">
                <div ref="editorElement">
                  <ckeditor
                    v-if="isLayoutReady"
                    v-model="config.initialData"
                    :editor="editor"
                    :config="config"
                    @ready="onReady"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </ClientOnly>
  </template>
  
  <script>
  import mammoth from "mammoth";
  import {
    DecoupledEditor,
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    BalloonToolbar,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    PageBreak,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo,
  } from "ckeditor5";
  
  import translations from "ckeditor5/translations/pt.js";
  
  import "ckeditor5/ckeditor5.css";
  
  export default {
    name: "app",
    data() {
      return {
        isLayoutReady: false,
        config: null, // CKEditor needs the DOM tree before calculating the configuration.
        editor: DecoupledEditor,
      };
    },
    mounted() {
      this.config = {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "showBlocks",
            "findAndReplace",
            "|",
            "heading",
            "style",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "removeFormat",
            "|",
            "specialCharacters",
            "horizontalLine",
            "pageBreak",
            "link",
            "insertImage",
            "insertImageViaUrl",
            "mediaEmbed",
            "insertTable",
            "highlight",
            "blockQuote",
            "codeBlock",
            "htmlEmbed",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          AccessibilityHelp,
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          Base64UploadAdapter,
          BlockQuote,
          Bold,
          Code,
          CodeBlock,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Markdown,
          MediaEmbed,
          PageBreak,
          Paragraph,
          PasteFromMarkdownExperimental,
          PasteFromOffice,
          RemoveFormat,
          SelectAll,
          ShowBlocks,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
          Undo,
        ],
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "insertImage",
          "|",
          "bulletedList",
          "numberedList",
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        language: "pt",
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        menuBar: {
          isVisible: true,
        },
        placeholder: "Coloque o conteúdo aqui!",
        style: {
          definitions: [
            {
              name: "Article category",
              element: "h3",
              classes: ["category"],
            },
            {
              name: "Title",
              element: "h2",
              classes: ["document-title"],
            },
            {
              name: "Subtitle",
              element: "h3",
              classes: ["document-subtitle"],
            },
            {
              name: "Info box",
              element: "p",
              classes: ["info-box"],
            },
            {
              name: "Side quote",
              element: "blockquote",
              classes: ["side-quote"],
            },
            {
              name: "Marker",
              element: "span",
              classes: ["marker"],
            },
            {
              name: "Spoiler",
              element: "span",
              classes: ["spoiler"],
            },
            {
              name: "Code (dark)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-dark"],
            },
            {
              name: "Code (bright)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-bright"],
            },
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
        translations: [translations],
      };
  
      this.isLayoutReady = true;
    },
  
    methods: {
      onReady(editor) {
        Array.from(this.$refs.editorToolbarElement.children).forEach((child) =>
          child.remove()
        );
        Array.from(this.$refs.editorMenuBarElement.children).forEach((child) =>
          child.remove()
        );
  
        this.$refs.editorToolbarElement.appendChild(
          editor.ui.view.toolbar.element
        );
        this.$refs.editorMenuBarElement.appendChild(
          editor.ui.view.menuBarView.element
        );
  
        // Guarda a instância do editor para uso futuro
        this.editorInstance = editor;
      },
      async importWordFile(event) {
        const file = event.target.files[0];
  
        if (
          file &&
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          try {
            
            const arrayBuffer = await file.arrayBuffer();
  
            // Opções para tentar preservar mais da formatação original
            const options = {
              styleMap: [
                "b => strong",
                "i => em",
                "u => u",
                "strike => strike",
                "p[style-name='Heading 1'] => h1:fresh",
                "p[style-name='Heading 2'] => h2:fresh",
                "p[style-name='Heading 3'] => h3:fresh",
                "r[style-name='Bold'] => strong",
                "r[style-name='Italic'] => em",
                "r[style-name='Underline'] => u",
                "highlight => span.highlight"
              ],
              includeDefaultStyleMap: true, // Incluir mapa de estilos padrão
              convertImage: mammoth.images.imgElement((image) =>
                image.read("base64").then((imageBuffer) => ({
                  src: `data:image/jpeg;base64,${imageBuffer}`,
                }))
              ),
              ignoreEmptyParagraphs: false,
            };
  
            
            // Converte o arquivo com as opções definidas
            const result = await mammoth.convertToHtml({ arrayBuffer }, options);
  
            // Verifica se o editor está pronto e insere o conteúdo
            if (this.editorInstance) {
              // Define o conteúdo no editor
              this.editorInstance.setData(result.value);
            } else {
              console.error("Editor não está pronto.");
            }
          } catch (error) {
            console.error("Erro ao importar o arquivo Word:", error);
          }
        } else {
          alert("Por favor, selecione um arquivo .docx");
        }
      },
    },
  };
  </script>
  