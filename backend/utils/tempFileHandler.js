const fs = require("fs").promises;
const path = require("path");
const os = require("os"); // For temporary directory

const tempDir = os.tmpdir(); // Get system's temporary directory

const writeTempTextFile = async (data) => {
  const filename = `event_data_${Date.now()}.json`;
  const filePath = path.join(tempDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data));
  return filePath;
};

const readTempTextFile = async (filePath) => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
};

const deleteTempFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted temporary text file: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting temporary text file ${filePath}:`, error);
  }
};

module.exports = { writeTempTextFile, readTempTextFile, deleteTempFile }; // <--- Yeh line theek karo
// Pichle code mein readTempTempFile tha, jo galat tha.
