import React, { useEffect, useMemo, useState } from "react";
import * as S from "./account-style";
import bgEllipse from "../../assets/bg-ellipse.png";
import request from "../../services/request";
import { logout } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const TABS = [
  { key: "overview", label: "Przegląd" },
  { key: "purchases", label: "Moje zakupy" },
  { key: "invoices", label: "Faktury" },
  { key: "changes", label: "Zgłoś zmianę" },
  { key: "profile", label: "Profil" },
];

function Account() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("overview");

  const [me, setMe] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [loadingMe, setLoadingMe] = useState(true);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  const [error, setError] = useState("");

  // Change request form
  const [crProductId, setCrProductId] = useState("");
  const [crTitle, setCrTitle] = useState("");
  const [crDetails, setCrDetails] = useState("");
  const [crSending, setCrSending] = useState(false);
  const [crSuccess, setCrSuccess] = useState("");

  const stats = useMemo(() => {
    const count = purchases?.length || 0;
    const special = purchases?.filter((p) => p?.product?.special).length || 0;
    return { count, special };
  }, [purchases]);

  useEffect(() => {
    const run = async () => {
      setError("");

      // /me
      try {
        setLoadingMe(true);
        const { data } = await request.get("/auth/me");
        setMe(data);
      } catch (e) {
        // brak tokena lub wygasł
        navigate("/login");
        return;
      } finally {
        setLoadingMe(false);
      }

      // purchases (endpoint do potwierdzenia / dopięcia)
      try {
        setLoadingPurchases(true);
        const { data } = await request.get("/purchase/my"); // <- jeśli masz inną ścieżkę, zmień
        // oczekiwany format: [{ id, purchasedAt, product: { id,title,type,previewImage,demoUrl,productCode,special } }]
        setPurchases(Array.isArray(data) ? data : data?.purchases || []);
      } catch (e) {
        // jeśli endpoint jeszcze nie istnieje – pokażemy placeholder, ale bez crasha
        setPurchases([]);
      } finally {
        setLoadingPurchases(false);
      }

      // invoices (na razie placeholder; podepniesz później)
      setLoadingInvoices(false);
      setInvoices([]);
    };

    run();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_) {
      // ignore
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  const submitChangeRequest = async () => {
    setError("");
    setCrSuccess("");

    if (!crProductId) {
      setError("Wybierz produkt, którego dotyczy zgłoszenie.");
      return;
    }
    if (!crTitle || !crDetails) {
      setError("Uzupełnij temat i opis zmian.");
      return;
    }

    try {
      setCrSending(true);
      // Endpoint do utworzenia zgłoszenia (do dopięcia w backendzie)
      await request.post("/changes/request", {
        productId: Number(crProductId),
        title: crTitle,
        details: crDetails,
      });

      setCrSuccess("Zgłoszenie wysłane. Damy znać mailowo, gdy ruszymy z realizacją.");
      setCrTitle("");
      setCrDetails("");
    } catch (e) {
      const msg = e?.response?.data?.message || "Nie udało się wysłać zgłoszenia.";
      setError(msg);
    } finally {
      setCrSending(false);
    }
  };

  return (
    <S.Wrapper $bg={bgEllipse}>
      <S.Shell>
        <S.Topbar>
          <div>
            <S.PageTitle>Panel klienta</S.PageTitle>
            <S.PageSub>
              {loadingMe ? "Ładuję konto..." : me ? `Zalogowano jako: ${me.email}` : ""}
            </S.PageSub>
          </div>

          <S.TopbarActions>
            <S.GhostButton type="button" onClick={() => navigate("/")}>
              Sklep
            </S.GhostButton>
            <S.DangerButton type="button" onClick={handleLogout}>
              Wyloguj
            </S.DangerButton>
          </S.TopbarActions>
        </S.Topbar>

        <S.Layout>
          <S.SideNav>
            <S.NavTitle>Nawigacja</S.NavTitle>
            <S.NavList>
              {TABS.map((t) => (
                <S.NavItem
                  key={t.key}
                  $active={tab === t.key}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </S.NavItem>
              ))}
            </S.NavList>
          </S.SideNav>

          <S.Main>
            {error && <S.Alert $type="error">{error}</S.Alert>}
            {crSuccess && <S.Alert $type="success">{crSuccess}</S.Alert>}

            {tab === "overview" && (
              <S.Card>
                <S.CardHeader>
                  <S.CardTitle>Przegląd</S.CardTitle>
                  <S.CardHint>Szybkie podsumowanie Twojego konta.</S.CardHint>
                </S.CardHeader>

                <S.KpiGrid>
                  <S.Kpi>
                    <S.KpiLabel>Zakupy</S.KpiLabel>
                    <S.KpiValue>{loadingPurchases ? "…" : stats.count}</S.KpiValue>
                  </S.Kpi>
                  <S.Kpi>
                    <S.KpiLabel>Wyróżnione pakiety</S.KpiLabel>
                    <S.KpiValue>{loadingPurchases ? "…" : stats.special}</S.KpiValue>
                  </S.Kpi>
                  <S.Kpi>
                    <S.KpiLabel>Faktury</S.KpiLabel>
                    <S.KpiValue>{loadingInvoices ? "…" : invoices.length}</S.KpiValue>
                  </S.Kpi>
                </S.KpiGrid>

                <S.Divider />

                <S.SectionTitle>Ostatnie zakupy</S.SectionTitle>
                {loadingPurchases ? (
                  <S.SkeletonList>
                    <S.SkeletonRow />
                    <S.SkeletonRow />
                    <S.SkeletonRow />
                  </S.SkeletonList>
                ) : purchases.length ? (
                  <S.PurchaseList>
                    {purchases.slice(0, 3).map((p) => (
                      <S.PurchaseRow key={p.id}>
                        <S.PurchaseInfo>
                          <S.PurchaseName>{p?.product?.title || "Produkt"}</S.PurchaseName>
                          <S.PurchaseMeta>
                            {p?.product?.type || "—"} • {new Date(p.purchasedAt).toLocaleDateString()}
                          </S.PurchaseMeta>
                        </S.PurchaseInfo>

                        <S.RowActions>
                          {p?.product?.demoUrl ? (
                            <S.SmallLink href={p.product.demoUrl} target="_blank" rel="noreferrer">
                              Podgląd
                            </S.SmallLink>
                          ) : (
                            <span />
                          )}
                          <S.SmallButton type="button" onClick={() => { setTab("changes"); setCrProductId(String(p.productId)); }}>
                            Zgłoś zmianę
                          </S.SmallButton>
                        </S.RowActions>
                      </S.PurchaseRow>
                    ))}
                  </S.PurchaseList>
                ) : (
                  <S.EmptyState>
                    Nie masz jeszcze zakupów. Przejdź do sklepu i wybierz produkt.
                  </S.EmptyState>
                )}
              </S.Card>
            )}

            {tab === "purchases" && (
              <S.Card>
                <S.CardHeader>
                  <S.CardTitle>Moje zakupy</S.CardTitle>
                  <S.CardHint>Twoje strony / aplikacje kupione w sklepie.</S.CardHint>
                </S.CardHeader>

                {loadingPurchases ? (
                  <S.SkeletonGrid>
                    <S.SkeletonTile />
                    <S.SkeletonTile />
                    <S.SkeletonTile />
                  </S.SkeletonGrid>
                ) : purchases.length ? (
                  <S.Grid>
                    {purchases.map((p) => (
                      <S.Tile key={p.id}>
                        <S.TileImage
                          style={{
                            backgroundImage: `url(${p?.product?.previewImage || ""})`,
                          }}
                        />
                        <S.TileBody>
                          <S.TileTitle>{p?.product?.title || "Produkt"}</S.TileTitle>
                          <S.TileMeta>
                            {p?.product?.type || "—"} • Kod: {p?.product?.productCode || "—"}
                          </S.TileMeta>

                          <S.TileActions>
                            {p?.product?.demoUrl ? (
                              <S.TileLink href={p.product.demoUrl} target="_blank" rel="noreferrer">
                                Otwórz demo
                              </S.TileLink>
                            ) : (
                              <span />
                            )}
                            <S.SmallButton
                              type="button"
                              onClick={() => {
                                setTab("changes");
                                setCrProductId(String(p.productId));
                              }}
                            >
                              Zgłoś zmianę
                            </S.SmallButton>
                          </S.TileActions>
                        </S.TileBody>
                      </S.Tile>
                    ))}
                  </S.Grid>
                ) : (
                  <S.EmptyState>Brak zakupów do wyświetlenia.</S.EmptyState>
                )}
              </S.Card>
            )}

            {tab === "invoices" && (
              <S.Card>
                <S.CardHeader>
                  <S.CardTitle>Faktury</S.CardTitle>
                  <S.CardHint>Pobieraj faktury do swoich zamówień.</S.CardHint>
                </S.CardHeader>

                <S.EmptyState>
                  Ten moduł podepniemy pod endpoint faktur (np. PDF / link do Stripe / Fakturownia).
                </S.EmptyState>
              </S.Card>
            )}

            {tab === "changes" && (
              <S.Card>
                <S.CardHeader>
                  <S.CardTitle>Zgłoś zmianę</S.CardTitle>
                  <S.CardHint>
                    Opisz zmiany, których potrzebujesz. Zgłoszenie trafi do realizacji.
                  </S.CardHint>
                </S.CardHeader>

                <S.Form>
                  <S.Field>
                    <S.Label>Wybierz zakup</S.Label>
                    <S.Select
                      value={crProductId}
                      onChange={(e) => setCrProductId(e.target.value)}
                    >
                      <option value="">— wybierz —</option>
                      {purchases.map((p) => (
                        <option key={p.id} value={p.productId}>
                          {p?.product?.title || `Produkt #${p.productId}`}
                        </option>
                      ))}
                    </S.Select>
                  </S.Field>

                  <S.Field>
                    <S.Label>Temat</S.Label>
                    <S.Input
                      value={crTitle}
                      onChange={(e) => setCrTitle(e.target.value)}
                      placeholder="np. Zmiana numeru telefonu na stronie"
                    />
                  </S.Field>

                  <S.Field>
                    <S.Label>Opis</S.Label>
                    <S.Textarea
                      value={crDetails}
                      onChange={(e) => setCrDetails(e.target.value)}
                      placeholder="Opisz dokładnie co ma być zmienione, najlepiej z linkami / tekstami do podmiany."
                      rows={6}
                    />
                  </S.Field>

                  <S.Button type="button" onClick={submitChangeRequest} disabled={crSending}>
                    {crSending ? "Wysyłam..." : "Wyślij zgłoszenie"}
                  </S.Button>

                  <S.Helper>
                    Tip: jeśli masz grafiki/załączniki, możemy dodać upload w kolejnym kroku.
                  </S.Helper>
                </S.Form>
              </S.Card>
            )}

            {tab === "profile" && (
              <S.Card>
                <S.CardHeader>
                  <S.CardTitle>Profil</S.CardTitle>
                  <S.CardHint>Dane konta i ustawienia.</S.CardHint>
                </S.CardHeader>

                <S.ProfileGrid>
                  <S.ProfileItem>
                    <S.ProfileLabel>E-mail</S.ProfileLabel>
                    <S.ProfileValue>{me?.email || "—"}</S.ProfileValue>
                  </S.ProfileItem>
                  <S.ProfileItem>
                    <S.ProfileLabel>Rola</S.ProfileLabel>
                    <S.ProfileValue>{me?.role || "—"}</S.ProfileValue>
                  </S.ProfileItem>
                </S.ProfileGrid>

                <S.Divider />

                <S.EmptyState>
                  Tu dodamy: dane do faktury, zmianę hasła, preferencje mailowe.
                </S.EmptyState>
              </S.Card>
            )}
          </S.Main>
        </S.Layout>
      </S.Shell>
    </S.Wrapper>
  );
}

export default Account;
