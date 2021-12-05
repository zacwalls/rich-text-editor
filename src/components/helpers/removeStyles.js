import { getSelectedBlocksMap } from "draftjs-utils";
import { EditorState, Modifier, SelectionState } from "draft-js";

const styles = [
  "BOLD",
  "ITALIC",
  "UNDERLINE",
  "COLOR",
  "HIGHLIGHT",
  "FONT-FAMILY",
  "FONT-SIZE",
];

function removeInlineStyles(editorState) {
  const contentState = editorState.getCurrentContent();
  const contentWithoutStyles = styles.reduce(
    (newContentState, style) =>
      Modifier.removeInlineStyle(
        newContentState,
        editorState.getSelection(),
        style
      ),
    contentState
  );

  const newEditorState = EditorState.push(
    editorState,
    contentWithoutStyles,
    "change-inline-style"
  );

  return newEditorState;
}

// For some reason, this isn't working with lists?
function removeBlockTypes(editorState) {
  const contentState = editorState.getCurrentContent();
  const blocksMap = getSelectedBlocksMap(editorState);
  const contentWithoutBlocks = blocksMap.reduce((newContentState, block) => {
    const blockType = block.getType();
    if (blockType === "unstyled") {
      const selectionState = SelectionState.createEmpty(block.getKey());
      const updatedSelection = selectionState.merge({
        focusOffset: 0,
        anchorOffset: block.getText().length,
      });

      return Modifier.setBlockType(
        newContentState,
        updatedSelection,
        "unstyled"
      );
    }

    return newContentState;
  }, contentState);

  const newEditorState = EditorState.push(
    editorState,
    contentWithoutBlocks,
    "change-block-type"
  );

  return newEditorState;
}

export { removeBlockTypes, removeInlineStyles };
