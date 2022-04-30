import fs from 'fs'

export const deleteFile = async (filename: string) => {
  try {
    // stat verifica se o arquivo existe
    // caso não exista dispara um erro
    await fs.promises.stat(filename)
  } catch (error) {
    return
  }

  // caso não dispare erro e caia no catch

  // unlink remove o arquivo
  await fs.promises.unlink(filename)
}