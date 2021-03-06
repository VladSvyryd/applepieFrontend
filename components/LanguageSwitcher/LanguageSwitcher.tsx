import { useStoreActions, useStoreState } from "../../hooks";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect, FC } from "react";
import { Language, locales } from "../../types/types";
import { motion } from "framer-motion";
import { getLanguage } from "../../util/translation/defineLanguage";
type LanguageSwitcherProps = {
  className?: any;
  compact?: boolean;
};
export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  className,
  compact = true,
}) => {
  const router = useRouter();
  // const router = useRouter();
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  // Pull out actions from our store
  const setCurrentLanguage = useStoreActions(
    (actions) => actions.language.setCurrentLanguage
  );
  const [toggle, setToggle] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggle(false);
      localStorage.setItem("applepieLanguage", event.target.value);
      setCurrentLanguage(+event.target.value);
      const regex = new RegExp(
        `^/(${locales.map((i) => Language[i]).join("|")})`
      );
      router.push(
        router.pathname,
        router.asPath.replace(regex, `/${Language[+event.target.value]}`)
      );
    },
    [router]
  );
  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );
  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);

  const langAnim = {
    in: { opacity: 0, y: 25, display: "none" },
    out: { opacity: 1, y: 0, display: "flex" },
  };
  useEffect(() => {
    console.log("def Lang in switcher" + String(router?.query?.lang));
    const myLang = getLanguage(String(router?.query?.lang));
    setCurrentLanguage(myLang);
  }, []);

  return !compact ? (
    <motion.form
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        lineHeight: "1",
        fontSize: "1rem",
      }}
      className={`${
        !invertedSlides.some((s) => s === activeCarouselIndex)
          ? "invertedTextColorBySlide"
          : ""
      }`}
    >
      <label
        style={{
          cursor: "pointer",
          textDecoration: currentLanguage == 0 ? `underline` : "none",
        }}
      >
        <input
          type="radio"
          value="0"
          checked={currentLanguage === 0}
          onChange={(e) => handleChange(e)}
          style={{
            display: "none",
          }}
        />
        EN
      </label>
      <span style={{ margin: "0 5px" }}>|</span>
      <label
        style={{
          textDecoration: currentLanguage == 1 ? `underline` : "none",
          cursor: "pointer",
        }}
      >
        <input
          type="radio"
          value="1"
          checked={currentLanguage === 1}
          onChange={(e) => handleChange(e)}
          style={{ display: "none" }}
        />
        DE
      </label>
    </motion.form>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "1",
        cursor: "pointer",
        marginTop: "8px",
      }}
      className={className}
    >
      <div
        onClick={() => setToggle(!toggle)}
        className={`${
          invertedSlides.some((s) => s === activeCarouselIndex)
            ? "invertedTextColorBySlide"
            : ""
        } langSwitchButton`}
      >
        <span> {String(Language[currentLanguage]).toUpperCase()}</span>
      </div>
      <motion.form
        initial="in"
        animate={!toggle ? "in" : "out"}
        variants={langAnim}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: "1",
          position: "absolute",
          bottom: "6px",
        }}
        className={`${
          invertedSlides.some((s) => s === activeCarouselIndex)
            ? "invertedTextColorBySlide"
            : ""
        }`}
      >
        {currentLanguage === 1 && (
          <label
            style={{
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              value="0"
              checked={currentLanguage === 0}
              onChange={(e) => handleChange(e)}
              style={{ display: "none" }}
            />
            EN
          </label>
        )}
        {currentLanguage === 0 && (
          <label
            style={{
              textDecoration: currentLanguage ? `underline` : "none",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              value="1"
              checked={currentLanguage === 1}
              onChange={(e) => handleChange(e)}
              style={{ display: "none" }}
            />
            DE
          </label>
        )}
      </motion.form>
    </div>
  );
};
