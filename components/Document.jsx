import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { Editor, EditorState, RichUtils } from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFile, faCheck, faUndo, faRedo, faPrint, faFont, 
         faBold, faItalic, faAlignLeft, faAlignRight, faAlignCenter, 
         faAlignJustify, faListOl, faListUl, faIndent, faOutdent } from '@fortawesome/fontawesome-free-solid';
import { faFillDrip, faHighlighter, faRemoveFormat } from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import 'draft-js/dist/Draft.css';
import '../css/Document.css';

library.add(faFile, faCheck, faUndo, faRedo, faPrint, faFont, faBold, 
            faItalic, faFillDrip, faHighlighter, faAlignLeft, faAlignRight, 
            faAlignCenter, faAlignJustify, faListOl, faListUl, faIndent, 
            faOutdent, faRemoveFormat);



const Document = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const [documentTitle, setDocumentTitle] = React.useState("Untitled Document");

    const updateDocumentTitle = () => {
        const titleText = document.getElementsByClassName('title-text')[0];
        let titleInput = `
            <div class="ruby">
                <input class="uk-input update-title" type="text" value="${documentTitle}">
                <button type="button" class="uk-button uk-button-default save-btn custom-btn">${ReactDOMServer.renderToString(<FontAwesomeIcon icon={["fas", "check"]} />)}</button>
            </div>
        `;

        titleText.insertAdjacentHTML('beforebegin', titleInput);
        titleText.style.display = 'none';

        titleInput = document.getElementsByClassName('update-title')[0];
        titleInput.select();

        const saveBtn = document.getElementsByClassName('save-btn')[0];

        saveBtn.addEventListener('click', () => {
            let newTitle = titleInput.value;

            if (titleInput.value.length === 0 || titleInput.value === null) {
                newTitle = "Untitled Document";
            }

            setDocumentTitle(newTitle);
            titleInput.remove();
            saveBtn.remove();
            titleText.style.display = "";
        });
    }
 
    return(
        <div className="uk-container uk-container-expand">
            <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                <div className="uk-navbar-container" data-uk-navbar>
                    <div className="uk-navbar-left">
                        <ul className="uk-navbar-nav">
                            <li>
                                <a href="/" alt="Document browser" className="uk-margin-small-left uk-navbar-item uk-logo">
                                    <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
                                </a>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active title">
                                    <span className="title-text" onClick={() => updateDocumentTitle()}>{documentTitle}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                <div className="uk-navbar-container" data-uk-navbar>
                    <div className="uk-navbar-left">
                        <ul className="uk-navbar-nav">
                            <li>
                                <span className="uk-navbar-item uk-active undo custom-btn">
                                    <FontAwesomeIcon icon={["fas", "undo"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active redo custom-btn">
                                    <FontAwesomeIcon icon={["fas", "redo"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active print custom-btn">
                                    <FontAwesomeIcon icon={["fas", "print"]} />
                                </span>
                            </li>
                            <hr class="uk-divider-vertical" />
                            <li>
                                <span className="uk-navbar-item uk-active font custom-btn">
                                    <FontAwesomeIcon icon={["fas", "font"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active print custom-btn">
                                    <FontAwesomeIcon icon={["fas", "bold"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active italic custom-btn">
                                    <FontAwesomeIcon icon={["fas", "italic"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active underline custom-btn">
                                    <FontAwesomeIcon icon={["fas", "underline"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active font-color custom-btn">
                                    <FontAwesomeIcon icon={["fas", "fill-drip"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active highlight custom-btn">
                                    <FontAwesomeIcon icon={["fas", "highlighter"]} />
                                </span>
                            </li>
                            <hr class="uk-divider-vertical" />
                            <li>
                                <span className="uk-navbar-item uk-active align-left custom-btn">
                                    <FontAwesomeIcon icon={["fas", "align-left"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active align-center custom-btn">
                                    <FontAwesomeIcon icon={["fas", "align-center"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active align-right custom-btn">
                                    <FontAwesomeIcon icon={["fas", "align-right"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active justify custom-btn">
                                    <FontAwesomeIcon icon={["fas", "justify"]} />
                                </span>
                            </li>
                            <hr class="uk-divider-vertical" />
                            <li>
                                <span className="uk-navbar-item uk-active ordered-list custom-btn">
                                    <FontAwesomeIcon icon={["fas", "list-ol"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active unordered-list custom-btn">
                                    <FontAwesomeIcon icon={["fas", "list-ul"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active indent custom-btn">
                                    <FontAwesomeIcon icon={["fas", "indent"]} />
                                </span>
                            </li>
                            <li>
                                <span className="uk-navbar-item uk-active outdent custom-btn">
                                    <FontAwesomeIcon icon={["fas", "outdent"]} />
                                </span>
                            </li>
                            <hr class="uk-divider-vertical" />
                            <li>
                                <span className="uk-navbar-item uk-active clear-format custom-btn">
                                    <FontAwesomeIcon icon={["fas", "remove-format"]} />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="uk-section uk-section-default editor-container">
                <Editor placeholder="Start typing here" editorState={editorState} onChange={setEditorState} />
            </div>
        </div> 
    );
}

export default Document;