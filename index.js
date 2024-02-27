// index.js
import inquirer from "inquirer";
import axios from "axios";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

const options = {
  fetchNodes: async () => {
    return [
      { title: "Celestia" },
      { title: "DYM" },
      { title: "Mina" },
      { title: "Dusk" },
      { title: "Kenshi" },
      { title: "Dusk" },
    ];
    // try {
    //   const response = await axios.get("https://api.github.com/gists/public");
    //   return response.data;
    // } catch (error) {
    //   console.error("API'dan veri alınırken bir hata oluştu:", error);
    //   return [];
    // }
  },
  displayNodes: async (nodes) => {
    console.log("Mevcut Nodeler:");
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "nodeAction",
        message: "Ne yapmak istersiniz?",
        choices: nodes.map((node, index) => {
          return `${index + 1}. ${node.title}`;
        }),
      },
    ]);
    return answers.nodeAction;
  },
  askUser: async () => {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "nodeAction",
        message: "Ne yapmak istersiniz?",
        choices: [
          "Aktif nodeleri listele",
          "Kurulabilir nodeleri listele",
          "Çıkış",
        ],
      },
    ]);

    return answers.nodeAction;
  },
};

const main = async () => {
  const userChoice = await options.askUser();
  switch (userChoice) {
    case "Aktif nodeleri listele":
      // Aktif nodeleri çekmek için API fonksiyonunu kullanın
      const activeNodes = await options.fetchNodes(); // Bu fonksiyonu API'nize uygun şekilde değiştirin
      options.displayNodes(activeNodes);
      break;
    case "Kurulabilir nodeleri listele":
      // Kurulabilir nodeleri çekmek için başka bir API fonksiyonu kullanabilirsiniz
      const installableNodes = await options.fetchNodes(); // Bu fonksiyonu da ihtiyacınıza göre değiştirin
      options.displayNodes(installableNodes);
      break;
    case "Çıkış":
      console.log("Programdan çıkılıyor...");
      console.log("Furkan Çelik");
      process.exit();
  }

  // Tekrar ana menüye dönmek için
};

// // yargs ile CLI argümanlarını işleyin
// yargs(hideBin(process.argv))
//   .command(
//     "start",
//     "CLI uygulamasını başlatır",
//     () => {},
//     async (argv) => {
//       await main();
//     }
//   )
//   .help()
//   .alias("help", "h").argv;

main();
