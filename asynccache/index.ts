import { * as promises } from 'fs';

type FilePath = string;
type FileContents = string;

class Cache {
  /**
    Cache of externally loaded files. Keys are FilePaths, values are FileContents
  */
  private fileCache = new Map();

  /**
    Get a file from cache or read it from the filesystem
  */
  async read(filePath: FilePath): Promise<FileContents> {
    // Normalize paths to avoid misses
    filePath = path.resolve(filePath);

    let fileContents;

    // Check cache for file
    if (this.fileCache.has(filePath)) {
      // Return cached file if its present
      fileContents = this.fileCache.get(filePath);
    } else {
      // Load from the filesystem if there's a cache miss
      fileContents = await fs.readFile(filePath, 'utf-8');

      // Store in cache
      this.fileCache.set(filePath, fileContents);
    }

    return fileContents;
  }
}
