interface ContextMenuProps {
  x: number;
  y: number;
  onAction: (action: "copy" | "delete" | "rename") => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onAction }) => {
  const handleContextMenuAction = (action: "copy" | "delete" | "rename") => {
    onAction(action);
  };

  return (
    <div
      data-testid="context-menu"
      className="context-menu"
      style={{ left: x, top: y }}
    >
      <div onClick={() => handleContextMenuAction("copy")}>Copy</div>
      <div onClick={() => handleContextMenuAction("delete")}>Delete</div>
      <div onClick={() => handleContextMenuAction("rename")}>Rename</div>
    </div>
  );
};

export default ContextMenu;
