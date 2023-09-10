interface File {
  type: string;
  name: string;
  data?: File[];
  meta?: string;
}

interface FilesAndFoldersProps {
  data: File;
  handleContextMenu: any;
  onFolderClick: any;
  handleKeyDown: any;
  activeItem: any;
  collapsedItem: any;
  depth: number;
  activeIndex: number;
  index: number;
}

const FilesAndFolders: React.FC<FilesAndFoldersProps> = ({
  data,
  handleContextMenu,
  onFolderClick,
  handleKeyDown,
  activeItem,
  collapsedItem,
  depth,
  activeIndex,
  index,
}) => {
  const isFolder = data.type === "folder";
  //   Handling Navigation using arrow keys is buggy. Uncomment this to check the status
  //   const isActive = activeItem === data.name || activeIndex === depth + index;
  const isActive = activeItem === data.name;
  return (
    <div className="files-list">
      <div
        className={`folder ${isActive ? "active" : ""}`}
        onClick={(e) => onFolderClick(data, depth)}
        onContextMenu={(e) => handleContextMenu(data, e)}
        onKeyDown={(e) => handleKeyDown(e, data)}
        tabIndex={depth}
      >
        {isFolder ? <span>🗂️</span> : <span>📄</span>}
        {data.name}
      </div>
      <div
        className={`folder-child ${
          !collapsedItem[data.name] ? "collapsed" : ""
        }`}
      >
        {data.data?.map((child, ind) => {
          return (
            <FilesAndFolders
              key={child.name}
              data={child}
              handleContextMenu={handleContextMenu}
              handleKeyDown={handleKeyDown}
              onFolderClick={onFolderClick}
              activeItem={activeItem}
              collapsedItem={collapsedItem}
              depth={depth + 1}
              index={ind + index}
              activeIndex={activeIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilesAndFolders;
