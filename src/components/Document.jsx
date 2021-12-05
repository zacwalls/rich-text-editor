/* eslint-disable default-case */
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFile,
  faCheck,
  faUndo,
  faRedo,
  faPrint,
  faBold,
  faItalic,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faListOl,
  faListUl,
} from "@fortawesome/fontawesome-free-solid";
import {
  faFillDrip,
  faHighlighter,
  faRemoveFormat,
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import "draft-js/dist/Draft.css";
import flow from "./helpers/flow.js";
import FontOptions from "./helpers/listFonts.js";
import {
  removeInlineStyles,
  removeBlockTypes,
} from "./helpers/removeStyles.js";
import "../css/Document.css";

library.add(
  faFile,
  faCheck,
  faUndo,
  faRedo,
  faPrint,
  faBold,
  faItalic,
  faFillDrip,
  faHighlighter,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faListOl,
  faListUl,
  faRemoveFormat
);

const stripPx = (pixelVal) => {
  return parseInt(pixelVal.substring(0, pixelVal.length - 1));
};

const Document = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  // I could probably use useReducer for some of these....
  const [documentTitle, setDocumentTitle] = React.useState("Untitled Document");
  const [alignment, setAlignment] = React.useState("left");
  const [textColor, setTextColor] = React.useState("#666666");
  const [textHighlight, setTextHighlight] = React.useState("#FFFFF");
  const [fontFamily, setFontFamily] = React.useState("Arial");
  const [fontSize, setFontSize] = React.useState("16px");

  const customStyleMap = {
    COLOR: {
      color: textColor,
    },
    HIGHLIGHT: {
      backgroundColor: textHighlight,
    },
    "FONT-FAMILY": {
      fontFamily: fontFamily,
    },
    "FONT-SIZE": {
      fontSize: fontSize,
    },
  };

  const setColor = (color, type) => {
    switch (type) {
      case "HIGHLIGHT":
        setTextHighlight(color);
        break;
      case "COLOR":
        setTextColor(color);
        break;
    }

    const newState = RichUtils.toggleInlineStyle(editorState, type);
    setEditorState(newState);
  };

  const handleClearFormatting = () => {
    const newState = flow([removeInlineStyles, removeBlockTypes])(editorState);

    setEditorState(newState);
    setAlignment("left");
  };

  const handleEditorToggleEvent = (event, type) => {
    const element = event.currentTarget;
    element.classList.toggle("toggled");

    const newState =
      type === "ordered-list-item" || type === "unordered-list-item"
        ? RichUtils.toggleBlockType(editorState, type)
        : RichUtils.toggleInlineStyle(editorState, type);

    setEditorState(newState);
  };

  const newFont = (value, type) => {
    switch (type) {
      case "FONT-FAMILY":
        setFontFamily(value);
        break;
      case "FONT-SIZE":
        setFontSize(value + "px");
        break;
    }

    const newState = RichUtils.toggleInlineStyle(editorState, type);
    setEditorState(newState);
  };

  const updateDocumentTitle = () => {
    const titleText = document.getElementsByClassName("title-text")[0];
    let titleInput = `
            <div class="ruby">
                <input class="uk-input update-title" type="text" value="${documentTitle}">
                <button type="button" class="uk-button uk-button-default save-btn custom-btn">${ReactDOMServer.renderToString(
                  <FontAwesomeIcon icon={["fas", "check"]} />
                )}</button>
            </div>
        `;

    titleText.insertAdjacentHTML("beforebegin", titleInput);
    titleText.style.display = "none";

    titleInput = document.getElementsByClassName("update-title")[0];
    titleInput.select();

    const saveBtn = document.getElementsByClassName("save-btn")[0];

    saveBtn.addEventListener("click", () => {
      let newTitle = titleInput.value;

      if (titleInput.value.length === 0 || titleInput.value === null) {
        newTitle = "Untitled Document";
      }

      setDocumentTitle(newTitle);
      titleInput.remove();
      saveBtn.remove();
      titleText.style.display = "";
    });
  };

  return (
    <div className="uk-container uk-container-expand">
      <div className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <a
                href="/"
                alt="Document browser"
                className="uk-margin-small-left uk-navbar-item uk-logo"
              >
                <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
              </a>
            </li>
            <li>
              <span className="uk-navbar-item uk-active title">
                <span
                  className="title-text"
                  onClick={() => updateDocumentTitle()}
                >
                  {documentTitle}
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
        <div className="uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <span
                  className="uk-navbar-item uk-active undo custom-btn"
                  onClick={() => setEditorState(EditorState.undo(editorState))}
                >
                  <FontAwesomeIcon icon={["fas", "undo"]} />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active redo custom-btn"
                  onClick={() => setEditorState(EditorState.redo(editorState))}
                >
                  <FontAwesomeIcon icon={["fas", "redo"]} />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active print custom-btn"
                  onClick={() => window.print()}
                >
                  <FontAwesomeIcon icon={["fas", "print"]} />
                </span>
              </li>
              <hr class="uk-divider-vertical" />
              <li>
                <span className="uk-navbar-item uk-form-controls font-family custom-btn">
                  <select
                    className="uk-select"
                    id="font-select"
                    value={fontFamily}
                    onChange={(e) =>
                      newFont(e.currentTarget.value, "FONT-FAMILY")
                    }
                  >
                    <FontOptions />
                  </select>
                </span>
              </li>
              <li>
                <span className="uk-navbar-item uk-active custom-btn">
                  <input
                    type="number"
                    className="uk-input font-size"
                    value={stripPx(fontSize)}
                    min="1"
                    onChange={(e) =>
                      newFont(e.currentTarget.value, "FONT-SIZE")
                    }
                  />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active print custom-btn"
                  onClick={(e) => {
                    handleEditorToggleEvent(e, "BOLD");
                  }}
                >
                  <FontAwesomeIcon icon={["fas", "bold"]} />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active italic custom-btn"
                  onClick={(e) => {
                    handleEditorToggleEvent(e, "ITALIC");
                  }}
                >
                  <FontAwesomeIcon icon={["fas", "italic"]} />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active underline custom-btn"
                  onClick={(e) => {
                    handleEditorToggleEvent(e, "UNDERLINE");
                  }}
                >
                  <FontAwesomeIcon icon={["fas", "underline"]} />
                </span>
              </li>
              <li>
                <span
                  id="font-color"
                  className="uk-inline uk-navbar-item custom-btn"
                >
                  <input
                    type="color"
                    id="color-picker"
                    onChange={(e) => setColor(e.currentTarget.value, "COLOR")}
                  />
                  <FontAwesomeIcon icon={["fas", "fill-drip"]} />
                </span>
              </li>
              <li>
                <span
                  id="highlight-color"
                  className="uk-inline uk-navbar-item highlight custom-btn"
                >
                  <input
                    type="color"
                    id="highlight-picker"
                    onChange={(e) =>
                      setColor(e.currentTarget.value, "HIGHLIGHT")
                    }
                  />
                  <FontAwesomeIcon icon={["fas", "highlighter"]} />
                </span>
              </li>
              <hr class="uk-divider-vertical" />
              <li>
                <span
                  className="uk-navbar-item uk-active align-left custom-btn"
                  onClick={() => setAlignment("left")}
                >
                  <FontAwesomeIcon icon={["fas", "align-left"]} />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active align-center custom-btn"
                  onClick={() => setAlignment("center")}
                >
                  <FontAwesomeIcon icon={["fas", "align-center"]} />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active align-right custom-btn"
                  onClick={() => setAlignment("right")}
                >
                  <FontAwesomeIcon icon={["fas", "align-right"]} />
                </span>
              </li>
              <hr class="uk-divider-vertical" />
              <li>
                <span
                  className="uk-navbar-item uk-active ordered-list custom-btn"
                  onClick={(e) =>
                    handleEditorToggleEvent(e, "ordered-list-item")
                  }
                >
                  <FontAwesomeIcon icon={["fas", "list-ol"]} />
                </span>
              </li>
              <li>
                <span
                  className="uk-navbar-item uk-active unordered-list custom-btn"
                  onClick={(e) =>
                    handleEditorToggleEvent(e, "unordered-list-item")
                  }
                >
                  <FontAwesomeIcon icon={["fas", "list-ul"]} />
                </span>
              </li>
              <hr class="uk-divider-vertical" />
              <li>
                <span
                  className="uk-navbar-item uk-active clear-format custom-btn"
                  onClick={() => handleClearFormatting()}
                >
                  <FontAwesomeIcon icon={["fas", "remove-format"]} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="uk-section uk-section-default editor-container">
        <Editor
          placeholder="Start typing here"
          editorState={editorState}
          onChange={setEditorState}
          textAlignment={alignment}
          customStyleMap={customStyleMap}
        />
      </div>
    </div>
  );
};

export default Document;
