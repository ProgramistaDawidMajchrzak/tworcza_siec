import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./style";
import bgEllipse from "../../assets/bg-ellipse.png";
import { resendVerification } from "../../services/auth.service";

function EmailVerified() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleResend = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Wpisz e-mail, na który mamy wysłać link aktywacyjny.");
      return;
    }

    try {
      setLoading(true);
      const data = await resendVerification({ email });
      setSuccess(data?.message || "Wysłaliśmy link aktywacyjny. Sprawdź skrzynkę e-mail.");
    } catch (err) {
      const msg = err?.response?.data?.message || "Nie udało się wysłać maila. Spróbuj ponownie.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrapper $bg={bgEllipse}>
      <S.SingleContainer>
        <S.Card>
          <S.Header>
            <S.SuccessPill>✅ E-mail potwierdzony</S.SuccessPill>
            <S.Title>Twoje konto jest aktywne</S.Title>
            <S.Subtitle>
              Możesz się teraz zalogować i przejść do panelu klienta.
            </S.Subtitle>
          </S.Header>

          <S.Actions>
            <S.Button type="button" onClick={() => navigate("/login")}>
              Przejdź do logowania
            </S.Button>

            <S.GhostButton type="button" onClick={() => navigate("/")}>
              Wróć na stronę główną
            </S.GhostButton>

            <S.SmallText>
              Jeśli nie możesz się zalogować, spróbuj wysłać link aktywacyjny ponownie:
            </S.SmallText>

            <S.Field>
              <S.Label>E-mail</S.Label>
              <S.Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="np. jan@firma.pl"
                autoComplete="email"
              />
            </S.Field>

            {error && <S.Alert $type="error">{error}</S.Alert>}
            {success && <S.Alert $type="success">{success}</S.Alert>}

            <S.SecondaryButton type="button" onClick={handleResend} disabled={loading}>
              {loading ? "Wysyłam..." : "Wyślij link ponownie"}
            </S.SecondaryButton>

            <S.Footer>
              <span>Masz już konto?</span>
              <S.FooterLink as={Link} to="/login">
                Zaloguj się
              </S.FooterLink>
            </S.Footer>
          </S.Actions>
        </S.Card>
      </S.SingleContainer>
    </S.Wrapper>
  );
}

export default EmailVerified;
