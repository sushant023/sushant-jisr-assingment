import React, { useState, useEffect } from "react";
import ContextMenu from "./ContextMenu";
import FilesAndFolders from "./FilesAndFolders";
import "./FileExplorer.css";

interface File {
  type: string;
  name: string;
  data?: File[];
  meta?: string;
}

interface FileExplorerProps {
  data: File;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ data }) => {
  const [collapsedItem, setCollapsedItem] = useState<{
    [name: string]: Boolean;
  }>({});
  const [activeItem, setActiveItem] = useState<string>("");
  const [contextMenu, setContextMenu] = useState<{
    file: File;
    x: number;
    y: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const setActiveCSS = (depth: number) => {
    document.documentElement.style.setProperty(
      "--active-width",
      `calc(100% + ${depth * 20}px + ${depth * 1}rem)`
    );
    document.documentElement.style.setProperty(
      "--active-left",
      `calc(-${depth * 20}px - ${depth * 1}rem)`
    );
  };

  useEffect(() => {
    window.onclick = (event: MouseEvent) => {
      setContextMenu(null);
    };
  }, []);

  useEffect(() => {
    const findFileOrFolder = (data: File, value: string, depth: number) => {
      if (!searchQuery) return;

      if (data.name.startsWith(searchQuery)) {
        setActiveCSS(depth);
        setActiveItem(data.name);
        return;
      } else {
        if (Array.isArray(data.data)) {
          data?.data?.forEach((child) => {
            findFileOrFolder(child, value, depth + 1);
          });
        } else {
          return null;
        }
      }
    };
    findFileOrFolder(data, searchQuery, 0);
  }, [data, searchQuery]);

  const onFolderClick = (file: File, depth: number) => {
    setActiveCSS(depth);
    setActiveItem(file.name);
    setCollapsedItem({
      ...collapsedItem,
      [file.name]: !collapsedItem[file.name],
    });
    // setRealDepth(depth);
    setContextMenu(null);
  };

  const handleContextMenu = (file: File, event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(null);
    setContextMenu({ file, x: event.clientX, y: event.clientY });
    setActiveItem(file.name);
  };

  const handleContextMenuAction = (action: "copy" | "delete" | "rename") => {
    if (contextMenu) {
      // Implement context menu actions
      console.log(`File: ${contextMenu.file.name}, Action: ${action}`);
      setContextMenu(null);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    data: File
  ) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prev) => prev + 1);
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prev) => prev - 1);
    } else if (event.key === "Enter") {
      // Handle Enter key to open folders
      setCollapsedItem({
        ...collapsedItem,
        [data.name]: !collapsedItem[data.name],
      });
    } else if (event.key === "c") {
      const el = document.querySelectorAll(".active")[0];
      const rect = el.getBoundingClientRect();
      const clientX = Math.floor((rect.left + rect.right) / 2);
      const clientY = Math.floor((rect.top + rect.bottom) / 2);

      setContextMenu({ file: data, x: clientX, y: clientY });
    }
  };

  return (
    <div className="file-explorer">
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onAction={handleContextMenuAction}
        />
      )}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          //   onBlur={(e) => setSearchQuery("")}
        />
      </div>
      <div className="file-list">
        <FilesAndFolders
          data={data}
          handleContextMenu={handleContextMenu}
          onFolderClick={onFolderClick}
          collapsedItem={collapsedItem}
          activeItem={activeItem}
          depth={0}
          index={0}
          handleKeyDown={handleKeyDown}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  );
};

export default FileExplorer;
