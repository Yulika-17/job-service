import { Button, Modal, PinInput, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../../Services/UserService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const VerifyEmail = (props: any) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        console.log(res);
        successNotification("Код отправлен", "Введите код из письма для подтверждения.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        setOtpSending(false);
        errorNotification("Ошибка отправки", err.response?.data?.errorMessage || "Ошибка сервера");
      });
  };

  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("Email подтверждён", "Вы успешно подтвердили адрес.");
        setVerified(true);
        props.onVerified?.(); // вызывается внешняя функция, если есть
        props.close();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Ошибка кода", err.response?.data?.errorMessage || "Неверный код");
      });
  };

  const resendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };

  return (
    <Modal opened={props.opened} onClose={props.close} title="Подтверждение Email">
      <div className="flex flex-col gap-6">
        <TextInput
          value={email}
          name="email"
          size="md"
          onChange={(e) => setEmail(e.target.value)}
          withAsterisk
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Ваш email"
          rightSection={
            <Button
              loading={otpSending && !otpSent}
              size="xs"
              className="mr-1"
              onClick={handleSendOtp}
              autoContrast
              disabled={email === "" || otpSent}
              variant="filled"
            >
              Получить код
            </Button>
          }
          rightSectionWidth="xl"
        />
        {otpSent && (
          <PinInput
            onComplete={handleVerifyOtp}
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            type="number"
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              fullWidth
              loading={otpSending}
              color="brightSun.4"
              onClick={resendOtp}
              autoContrast
              variant="light"
            >
              {resendLoader ? seconds : "Отправить повторно"}
            </Button>
            <Button fullWidth onClick={changeEmail} autoContrast variant="filled">
              Изменить email
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VerifyEmail;
