import {
  forwardRef,
  useState,
  useImperativeHandle,
  FC,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import formSlider from "./formSlider.module.scss";
import { useStoreState, useStoreActions } from "../../hooks";
import { Language } from "../../types/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Congrats from "../Congrats/Congrats";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DatePicker from "react-datepicker";
import { client } from "../../pages/_app";
import {
  services_de,
  services_en,
  contact_form_de,
  contact_form_en,
} from "../../queries/queries";
interface Person {
  name: string;
  email: string;
}
interface Response {
  data?: { id?: number; name: string };
  success: boolean;
  error: string;
}
interface ResponseDeal {
  data?: { id?: number };
  success: boolean;
  error: string;
}
const initialFormikState = {
  email: "",
  name: "",
  message: "",
  value: "",
  services: [],
  date: "",
};
// enum SERVICE_ID_BACKEND {
//   SHOP = 28,
//   GET_NEW_CLIENTS = 29,
//   CONVERSION_RATE = 30,
//   EMAIL_MARKETIN = 31,
// }
const UNIQUE_SERVICE_DEALFIELD = "d9bd3966fcf0780f67fbca93b7d32656f6769ab0";
// const UNIQUE_SERVICE_DEALFIELD = "146a6087ef8c0aa7f7bffe8d022eb2c1ab73542e";
export type Service = {
  group: string;
  name: string;
  pipedrive_id: string;
  description: string;
};
export type ContactForm = {
  services_question: string;
  service_error_message: string;
  name_question: string;
  name: string;
  name_error_message: string;
  email_question: string;
  email_placeholder: string;
  project_question: string;
  budget_error_message: string;
  budget_title: string;
  budget_placeholder: string;
  date_title: string;
  message_title: string;
  message_error: string;
  message_placeholder: string;
  email_question_error_en: string;
};
const FormSlider = forwardRef<any>((props, ref) => {
  const [myservices, setServices] = useState<any>(null);
  const [contactForm, setContactForm] = useState<any>(null);
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  useEffect(() => {
    const fetchServices = async () => {
      try {
        let responseServices;
        let responseContactForm;
        if (currentLanguage === Language.de) {
          responseServices = await client.query({ query: services_de });
          responseContactForm = await client.query({ query: contact_form_de });
        } else {
          responseServices = await client.query({ query: services_en });
          responseContactForm = await client.query({ query: contact_form_en });
        }
        setServices(responseServices.data.service.service as Service[]);
        setContactForm(responseContactForm.data.contact as ContactForm);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, []);

  const setInterFormState = useStoreActions(
    (state) => state.device.setInterFormState
  );
  const [, setResponse] = useState({
    type: "",
    message: "",
  });
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const createPersonValues: Person = {
      name: values.name,
      email: values.email,
    };

    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/persons?api_token=${process.env.PIPEDRIVE_API_ACCESS_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(createPersonValues),
          headers: { "Content-Type": "application/json" },
        }
      );

      const json: Response = await res.json();

      if (json.success) {
        setResponse({
          type: "Success",
          message: "Thank you for reaching out to us.",
        });
        resetForm({});
        setSubmitting(false);

        const deal_id =
          json.data?.id &&
          (await createDeal(
            json.data?.id,
            `SP // ${json.data?.name}`,
            formObject.value,
            values.services,
            getFormattedDate(startDate)
          ));

        typeof deal_id === "number" &&
          json.data?.id &&
          createActivity(json.data?.id, deal_id, values.message);
      } else {
        setResponse({
          type: "Error",
          message: json.error,
        });
        setSubmitting(false);
      }
    } catch (e) {
      console.log("An error occurred", e);

      setResponse({
        type: "error",
        message:
          "An error occured while submitting the form, please try again.",
      });
    }
  };
  const createDeal = async (
    user_id: number,
    title: string,
    value: string,
    services: [string],
    date: string
  ) => {
    let deal: any = {
      title: title,
      person_id: user_id,
      value: value,
      expected_close_date: date,
    };
    deal[UNIQUE_SERVICE_DEALFIELD.toString()] = services.join(",");
    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/deals?api_token=${process.env.PIPEDRIVE_API_ACCESS_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(deal),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json: ResponseDeal = await res.json();
      if (json.success) {
        return json.data?.id;
      }
    } catch (e) {
      console.log("An error occurred", e);

      setResponse({
        type: "error",
        message:
          "An error occured while submitting the form, please try again.",
      });
    }
  };

  const createActivity = async (
    user_id: number,
    deal_id: number,
    message: string
  ) => {
    const activity = {
      person_id: user_id,
      deal_id: deal_id,
      subject: "antworte auf Anfrage",
      type: "email",
      note: message,
    };
    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/activities?api_token=${process.env.PIPEDRIVE_API_ACCESS_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(activity),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await res.json();

      if (json.success) {
        setCurrentSlide(4);
        setCongratsName(formObject.name);
        setFormObject(initialFormikState);
        setResponse({
          type: "Success",
          message: "Thank you for reaching out to us.",
        });
      } else {
        setResponse({
          type: "Error",
          message: json.error,
        });
      }
    } catch (e) {
      console.log("An error occurred", e);
      setResponse({
        type: "error",
        message:
          "An error occured while submitting the form, please try again.",
      });
    }
  };

  const validate = (value: any) => {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
      errorMessage = contactForm && contactForm.email_question_error;
      setFormObject((prev) => ({ ...prev, email: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, email: value }));
    }
    return errorMessage;
  };
  const isRequiredName = (value: any) => {
    let errorMessage;
    if (value.length <= 0) {
      errorMessage = contactForm && contactForm.name_error_message;

      setFormObject((prev) => ({ ...prev, name: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, name: value }));
    }
    return errorMessage;
  };
  const isRequiredPrice = (value: any) => {
    console.log(value);
    let errorMessage;
    if (value.length <= 0) {
      errorMessage = contactForm && contactForm.budget_error_message;
      setFormObject((prev) => ({ ...prev, value: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, value }));
    }
    return errorMessage;
  };

  const isRequiredMessage = (value: any) => {
    let errorMessage;
    if (value.length <= 0) {
      errorMessage = contactForm && contactForm.message_error;
      setFormObject((prev) => ({ ...prev, message: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, message: value }));
    }
    return errorMessage;
  };

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument

  useImperativeHandle(ref, () => ({
    goToNext() {
      handleNextSlideClick();
    },
    goToPrev() {
      handlePrevSlideClick();
    },
  }));
  const [currentSlider, setCurrentSlide] = useState(0);
  const [currentSliderHistory, setCurrentSlideHistory] = useState([0]);
  const reveal = {
    active: {
      scale: 1,
      x: 0,
      transition: { duration: 0.3, when: "beforeChildren" },
    },
    passive: {
      scale: 0,
      x: 0,
      transition: { duration: 0.3, when: "beforeChildren" },
    },
  };
  const SLIDESCOUNT = 5;
  const canIGoNext = () => {
    const currentSlideIndex = currentSlider;
    let key = false;
    switch (currentSlideIndex) {
      case 0:
        if (formObject.services.length > 0) {
          key = true;
        }
        break;
      case 1:
        if (formObject.name.length > 0) {
          key = true;
        }
        break;
      case 2:
        if (formObject.email.length > 0) {
          key = true;
        }
        break;
      case 3:
        if (
          formObject.value.length > 0 &&
          formObject.date.length > 0 &&
          formObject.message.length > 0
        ) {
          key = true;
        }
        break;

      default:
        key: false;
        break;
    }
    return key;
  };
  const handleNextSlideClick = () => {
    if (canIGoNext() && currentSlider >= 0 && currentSlider < 3) {
      setCurrentSlide(currentSlider + 1);
      console.log(currentSlider + 1);
      setCurrentSlideHistory((old) => [...old, currentSlider + 1]);
      switch (currentSlider + 1) {
        case 1:
          nameRef.current.focus();
          break;
        case 2:
          emailRef.current.focus();
          break;
        case 3:
          geldRef.current.focus();
          break;
        default:
          break;
      }
    }
    if (currentSlider === 4) {
      setInterFormState(false);
    }
  };
  const handlePrevSlideClick = () => {
    if (canIGoNext() && currentSlider > 0 && currentSlider <= 3) {
      setCurrentSlide(currentSlider - 1);
    }
  };
  const activeBullet = {
    active: { scale: 1.57, transition: { type: "spring", stiffness: 100 } },
    passive: { scale: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const interactiveFormOpened = useStoreState(
    (state) => state.device.interactiveFormOpened
  );
  const [formObject, setFormObject] = useState(initialFormikState);
  const [congratsName, setCongratsName] = useState("");
  const nameRef = useRef<any>();
  const emailRef = useRef<any>();
  const geldRef = useRef<any>();
  useEffect(() => {
    setCongratsName("");
    if (currentSlider === 4) setCurrentSlide(0);
  }, [interactiveFormOpened]);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const ExampleCustomInput = ({ value, onClick, inverted }: any) => (
    <div
      className={`${formSlider.input} ${
        //@ts-ignore
        inverted && formSlider.inverted
      }`}
      style={{ lineHeight: "normal" }}
      onClick={onClick}
    >
      {value}
    </div>
  );
  const getFormattedDate = (date: Date | null) => {
    if (!date) return new Date().toString();
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className={formSlider.mySlider}>
      <div className={formSlider.paginationContainer}>
        <motion.div
          className={`${formSlider.pagination} ${
            //@ts-ignore
            props.inverted && formSlider.inverted
          } `}
        >
          {new Array(SLIDESCOUNT).fill(null).map((_bullet, i) => (
            <motion.div
              key={"ser" + i}
              className={`${formSlider.bulletContainer}`}
            >
              <motion.span
                animate={
                  currentSliderHistory.findIndex((c) => i == c) >= 0
                    ? "active"
                    : "passive"
                }
                variants={activeBullet}
                onClick={() =>
                  i <= currentSliderHistory[currentSliderHistory.length - 1] &&
                  setCurrentSlide(i)
                }
                className={`${formSlider.bullet} ${
                  //@ts-ignore
                  props.inverted && formSlider.inverted
                } ${
                  currentSliderHistory.findIndex((c) => i == c) >= 0 &&
                  formSlider.active
                }`}
              ></motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className={formSlider.sliderContainer}>
        <Formik initialValues={initialFormikState} onSubmit={handleSubmit}>
          {({ isSubmitting, handleSubmit }) => (
            <>
              <Form
                className={`${formSlider.form} ${
                  currentSlider === 3 && formSlider.minHeight
                }  themeForm`}
              >
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 0 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div
                    className={`${formSlider.header} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <h2>{contactForm && contactForm.services_question}</h2>
                  </div>
                  <div
                    className={`${formSlider.fieldRow} + " " + ${
                      formSlider.checkboxContainer
                    } ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <CheckboxGroup
                      checkboxArray={myservices && myservices}
                      setCheckboxStatus={setFormObject}
                      inverted={
                        //@ts-ignore
                        props.inverted
                      }
                    />
                    {!canIGoNext() && (
                      <Error
                        inverted={
                          //@ts-ignore
                          props.inverted
                        }
                      >
                        {contactForm && contactForm.service_error_message}
                      </Error>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 1 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div
                    className={`${formSlider.header} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <h2>{contactForm && contactForm.name_question}</h2>
                  </div>
                  <div className={formSlider.fieldRow}>
                    <Field
                      type="text"
                      name="name"
                      placeholder={contactForm && contactForm.name}
                      validate={isRequiredName}
                      className={`${formSlider.input} ${
                        //@ts-ignore
                        props.inverted && formSlider.inverted
                      }`}
                      innerRef={nameRef}
                      autoFocus
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => (
                        <Error
                          inverted={
                            //@ts-ignore
                            props.inverted
                          }
                        >
                          {msg}
                        </Error>
                      )}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 2 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div
                    className={`${formSlider.header} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <h2>{contactForm && contactForm.email_question}</h2>
                  </div>
                  <div className={formSlider.fieldRow}>
                    <Field
                      type="email"
                      name="email"
                      placeholder={contactForm && contactForm.email_placeholder}
                      validate={validate}
                      className={`${formSlider.input} ${
                        //@ts-ignore
                        props.inverted && formSlider.inverted
                      }`}
                      innerRef={emailRef}
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <Error
                          inverted={
                            //@ts-ignore
                            props.inverted
                          }
                        >
                          {msg}
                        </Error>
                      )}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 3 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div
                    className={`${formSlider.header} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <h2>{contactForm && contactForm.project_question}</h2>
                  </div>
                  <div
                    className={`${formSlider.textareaRow} ${
                      formSlider.fieldRowMultiple
                    } ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                    style={{
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 100,
                      position: "relative",
                    }}
                  >
                    <h4>{contactForm && contactForm.budget_title}</h4>
                    <Field
                      type="text"
                      name="value"
                      validate={isRequiredPrice}
                      className={`${formSlider.input} ${
                        //@ts-ignore
                        props.inverted && formSlider.inverted
                      }`}
                      innerRef={geldRef}
                      placeholder={
                        contactForm && contactForm.budget_placeholder
                      }
                    />
                    <span className={formSlider.euro}>€</span>
                    <ErrorMessage
                      name="value"
                      render={(msg) => (
                        <Error
                          inverted={
                            //@ts-ignore
                            props.inverted
                          }
                        >
                          {msg}
                        </Error>
                      )}
                    />
                  </div>

                  <div
                    className={` ${formSlider.fieldRowMultiple} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                    style={{
                      marginBottom: 20,
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: 510,
                    }}
                  >
                    <h4>{contactForm && contactForm.date_title}</h4>
                    <DatePicker
                      selected={startDate}
                      dateFormat="dd.MM.yyyy"
                      popperPlacement="bottom-center"
                      customInput={
                        <ExampleCustomInput
                          inverted={
                            //@ts-ignore
                            props.inverted
                          }
                        />
                      }
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  <div
                    className={`${formSlider.textareaRow} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <h4>{contactForm && contactForm.message_title}</h4>
                    <Field
                      name="message"
                      validate={isRequiredMessage}
                      as="div"
                      className={`${formSlider.input} `}
                      render={({
                        field,
                        form: { setFieldValue, touched, errors },
                      }: any) => (
                        <>
                          <TextareaAutosize
                            aria-label="minimum height"
                            {...field}
                            rowsMin={6}
                            rowsMax={9}
                            onChange={(event) =>
                              setFieldValue("message", event.target.value)
                            }
                            className={`${formSlider.textfield} ${
                              //@ts-ignore
                              props.inverted && formSlider.inverted
                            }`}
                            placeholder={
                              contactForm && contactForm.message_placeholder
                            }
                          />

                          {touched[field.name] && errors[field.name] && (
                            <Error
                              inverted={
                                //@ts-ignore
                                props.inverted
                              }
                            >
                              {errors[field.name]}
                            </Error>
                          )}
                        </>
                      )}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 4 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div
                    className={`${formSlider.header} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    <Congrats
                      inverted={
                        //@ts-ignore
                        props.inverted
                      }
                    />
                    <h2 style={{ textAlign: "center" }}>
                      {currentLanguage === Language.de
                        ? `Glückwunsch, ${congratsName}!`
                        : `Congratulations, ${congratsName}!`}
                    </h2>
                  </div>
                </motion.div>
              </Form>
              {currentSlider === 3 && (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={!canIGoNext() && isSubmitting}
                  className={`button ${formSlider.button} ${
                    //@ts-ignore
                    props.inverted && formSlider.inverted
                  }`}
                >
                  {currentLanguage === Language.de ? "LOS" : "GO"}
                </button>
              )}
            </>
          )}
        </Formik>
      </motion.div>

      {currentSlider < 3 && (
        <>
          <div
            className={`${formSlider.press} ${
              //@ts-ignore
              props.inverted && formSlider.inverted
            }`}
          >
            {currentSlider === 4 ? "Back to page" : "Press Enter"}
          </div>
          <button
            className={`button ${formSlider.button} ${
              //@ts-ignore
              props.inverted && formSlider.inverted
            }`}
            onClick={() => handleNextSlideClick()}
          >
            {currentLanguage === Language.de ? "Weiter" : "Next"}
          </button>
        </>
      )}
    </div>
  );
});

const Error: React.FC<{ inverted: boolean }> = (props) => {
  const errAnim = {
    on: { opacity: 1, y: 0 },
    off: { opacity: 0, y: -30 },
  };
  return (
    <motion.div
      variants={errAnim}
      initial="off"
      animate="on"
      exit="off"
      className={`${formSlider.errorMessage} ${
        //@ts-ignore
        props.inverted && formSlider.inverted
      }`}
    >
      {props.children}
    </motion.div>
  );
};
type CheckboxProps = {
  checkboxArray: Service[];
  setCheckboxStatus: Dispatch<SetStateAction<any>>;
  inverted: boolean;
  [x: string]: any;
};
export const CheckboxGroup: FC<CheckboxProps> = (props) => {
  const { checkboxArray, setCheckboxStatus, inverted } = props;
  const updateFormikState = (form: any, field: any, service: any) => {
    if (field.value.includes(service.pipedrive_id)) {
      const nextValue = field.value.filter(
        (value: string) => value !== service.pipedrive_id
      );
      form.setFieldValue(service.group, nextValue);
    } else {
      const nextValue = field.value.concat(service.pipedrive_id);
      form.setFieldValue(service.group, nextValue);
    }
    form.setFieldError(service.group, field.value.error);
  };
  const validate = (e: any) => {
    let errorMessage;
    if (e.length > 0) {
      setCheckboxStatus((prev: any) => ({ ...prev, services: e }));
    } else {
      setCheckboxStatus((prev: any) => ({ ...prev, services: [] }));

      errorMessage = "ERROR";
    }
    return errorMessage;
  };
  return (
    <>
      {checkboxArray &&
        checkboxArray.map((service: Service) => (
          <Field
            name={service.group}
            key={service.name + "-" + service.pipedrive_id}
            validate={(e: any) => validate(e)}
          >
            {({ field, form }: any) => (
              <label>
                <input
                  type="checkbox"
                  checked={field.value.includes(service.pipedrive_id)}
                  onChange={() => updateFormikState(form, field, service)}
                />
                <div
                  className={`${formSlider.labelText} ${
                    inverted && formSlider.inverted
                  }`}
                >
                  {service.name}
                </div>
              </label>
            )}
          </Field>
        ))}
      <ErrorMessage
        name={"services"}
        render={(msg) => (
          <Error
            inverted={
              //@ts-ignore
              props.inverted
            }
          >
            {msg}
          </Error>
        )}
      />
    </>
  );
};
export default FormSlider;
