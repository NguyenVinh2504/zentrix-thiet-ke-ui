import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { globSync } from "glob";

// Cú pháp chuẩn của ES Module để lấy đường dẫn thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tự động tìm tất cả các file .html trong thư mục gốc
const htmlFiles = globSync("*.html");

// Tạo đối tượng input cho Rollup từ các file HTML đã tìm thấy
const input = htmlFiles.reduce((acc, file) => {
  const name = file.slice(0, file.length - ".html".length);
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  // Giả sử bạn đã đặt thư mục assets và favicon vào trong thư mục 'public'
  // Nếu không, bạn cần dùng lại plugin vite-plugin-static-copy như đã thảo luận.

  build: {
    outDir: "dist",
    rollupOptions: {
      input: input,
    },
  },
});
