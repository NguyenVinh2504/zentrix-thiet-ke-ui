import { resolve } from "path";
import { defineConfig } from "vite";
import { globSync } from "glob";

// Tự động tìm tất cả các file .html trong thư mục gốc
const htmlFiles = globSync("*.html");

// Tạo đối tượng input cho Rollup từ các file HTML đã tìm thấy
const input = htmlFiles.reduce((acc, file) => {
  const name = file.slice(0, file.length - ".html".length);
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  // Với cấu trúc mới, bạn không cần chỉ định 'publicDir'
  // vì Vite sẽ tự động sử dụng thư mục 'public' làm mặc định.

  build: {
    outDir: "dist",
    rollupOptions: {
      input: input,
    },
  },
});
