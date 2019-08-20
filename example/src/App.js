import React, { Component } from "react";
import "./App.css";

const API_KEY =
  "trnsl.1.1.20190323T052646Z.f2a4ded327c858d4.2f4ebdb511523a757280885a41f1864cda7928ed";

class App extends Component {
  state = {
    sourceText: "",
    translatedText: "",
    destLanguage: "en",
    destLanguages: { en: "English" }
  };

  async componentDidMount() {
    await this.getDestLangauges();
  }

  async getDestLangauges() {
    const data = await fetch(
      "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=" +
        API_KEY +
        "&ui=en"
    );
    const json = await data.json();
    const langs = json.langs;

    console.log("get dest languages response", json);

    this.setState({
      destLanguages: langs
    });
  }

  async getSourceLanguage(text) {
    const data = await fetch(
      "https://translate.yandex.net/api/v1.5/tr.json/detect?key=" +
        API_KEY +
        "&text=" +
        encodeURIComponent(text)
    );
    const json = await data.json();

    console.log("source language response", json);

    return json.lang;
  }

  async getTranslatedText(text, sourceLang, destLang) {
    const data = await fetch(
      "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" +
        API_KEY +
        "&text=" +
        encodeURIComponent(text) +
        "&lang=" +
        sourceLang +
        "-" +
        destLang
    );
    const json = await data.json();

    console.log("translated text response", json);

    return json.text;
  }

  async translateText() {
    const sourceLang = await this.getSourceLanguage(this.state.sourceText);
    const destLang = this.state.destLanguage;

    const translatedText = await this.getTranslatedText(
      this.state.sourceText,
      sourceLang,
      destLang
    );

    this.setState({
      translatedText
    });
  }

  render() {
    const {
      sourceText,
      destLanguage,
      destLanguages,
      translatedText
    } = this.state;

    return (
      <div className="main-container">
        <select
          value={destLanguage}
          onChange={evnt => {
            const value = evnt.target.value;
            this.setState({
              destLanguage: value
            });
          }}
        >
          {Object.entries(destLanguages).map(
            ([destLanguageAbbrev, destLanguage], i) => (
              <option key={i} value={destLanguageAbbrev}>
                {destLanguage}
              </option>
            )
          )}
        </select>

        <div className="text-container">
          <textarea
            className="text"
            onInput={evnt => {
              const value = evnt.target.value;
              this.setState({
                sourceText: value
              });
            }}
            defaultValue={sourceText}
          />
          <div className="text">{translatedText}</div>
        </div>

        <button
          className="translate-btn"
          onClick={() => {
            if (this.state.sourceText.length > 0) {
              this.translateText();
            }
          }}
        >
          Translate
        </button>
      </div>
    );
  }
}

export default App;
