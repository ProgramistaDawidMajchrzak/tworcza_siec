import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as S from "./style-wizard";
import bgEllipse from "../../assets/bg-ellipse.png";
import request from "../../services/request";

const STEPS = [
  { key: "company", label: "Dane firmy" },
  { key: "assets", label: "Materiały" },
  { key: "content", label: "Treści" },
  { key: "domain", label: "Domena" },
  { key: "summary", label: "Podsumowanie" },
];

function CheckoutWizard() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [search] = useSearchParams();
  const planName = search.get("plan") || "Płatność jednorazowa";

  const [step, setStep] = useState(0);

  // FORM STATE
  const [form, setForm] = useState({
    // step 1
    companyFullName: "",
    companyShortName: "",
    contactEmails: [""],   // 1..3
    contactPhones: [""],   // 0..3 (ale trzymamy jako 1 slot pusty dla UX)
    industry: "",
    businessModel: [],

    // step 2
    hasLogo: "no",
    logoFiles: [],
    images: [],
    driveLink: "",
    assetsNotes: "",

    // step 3
    businessDescription: "",
    services: "",
    contactData: "",
    inspirations: "",
    stylePref: "Nowoczesny",
    siteGoals: [],        // checkboxy celu strony
    siteGoalOther: "",    // tekst dla "Inne"

    targetAudience: [],       // checkboxy klienta docelowego
    targetAudienceOther: "",  // tekst dla "Inne"

    // step 4
    hasDomain: "yes",
    domainName: "",
    domainProposals: "",
    techNotes: "",

    acceptTerms: false,
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const MAX_LOGOS = 5;

  const addLogoSlot = () => {
    update({
      logoFiles: [...form.logoFiles, null].slice(0, MAX_LOGOS),
    });
  };

  const setLogoAt = (index, file) => {
    const next = [...form.logoFiles];
    next[index] = file || null;

    // usuń puste "dziury" na końcu (ładniej w UI)
    while (next.length > 0 && !next[next.length - 1]) next.pop();

    update({ logoFiles: next });
  };

  const removeLogoAt = (index) => {
    const next = [...form.logoFiles];
    next.splice(index, 1);
    update({ logoFiles: next });
  };


  const canGoNext = useMemo(() => {
    // minimalne walidacje per krok, żeby user nie utknął
    if (STEPS[step].key === "company") return !!form.companyFullName && !!(form.contactEmails?.[0]?.trim());
    if (STEPS[step].key === "assets") return true;
    if (STEPS[step].key === "content")
      return (
        !!form.businessDescription?.trim() &&
        (form.siteGoals?.length || form.siteGoalOther?.trim()) &&
        (form.targetAudience?.length || form.targetAudienceOther?.trim())
      );
    if (STEPS[step].key === "domain") return true;
    if (STEPS[step].key === "summary") return form.acceptTerms;
    return true;
  }, [step, form]);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const next = () => {
    setError("");
    if (!canGoNext) {
      setError("Uzupełnij wymagane pola, aby przejść dalej.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  // MVP: zapis zamówienia + plików na backend (na razie możesz to tylko logować)
  const submitOrder = async () => {
    setError("");
    if (!form.acceptTerms) {
      setError("Zaznacz akceptację regulaminu, aby kontynuować.");
      return;
    }

    try {
      setSaving(true);

      // 1) wysyłka danych (JSON) – zamówienie draft
      const { data } = await request.post("/orders/create-draft", {
        productId: Number(productId),
        planName,
        companyFullName: form.companyFullName,
        companyShortName: form.companyShortName,
        businessModel: form.businessModel,
        contactEmails: form.contactEmails.filter(e => e.trim()),
        contactPhones: form.contactPhones.filter(p => p.trim()),
        industry: form.industry,
        businessDescription: form.businessDescription,
        services: form.services,
        contactData: form.contactData,
        inspirations: form.inspirations,
        stylePref: form.stylePref,
        siteGoals: form.siteGoals,
        siteGoalOther: form.siteGoalOther?.trim(),
        targetAudience: form.targetAudience,
        targetAudienceOther: form.targetAudienceOther?.trim(),
        hasDomain: form.hasDomain === "yes",
        domainName: form.domainName,
        domainProposals: form.domainProposals,
        assetsNotes: form.assetsNotes,
        driveLink: form.driveLink,
        techNotes: form.techNotes,
      });

      // data.orderId (zakładamy)
      const orderId = data?.orderId;

      // 2) upload plików (logo + zdjęcia)
      if (orderId && ((form.logoFiles?.filter(Boolean).length) || form.images.length)) {
        const fd = new FormData();
        form.logoFiles?.filter(Boolean).forEach((f) => fd.append("logos", f));
        form.images.forEach((img) => fd.append("images", img));
        await request.post(`/orders/${orderId}/upload`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 3) przejście do płatności (na MVP może być placeholder)
      navigate(`/payment/${orderId}`);
    } catch (e) {
      const msg = e?.response?.data?.message || "Nie udało się utworzyć zamówienia.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const MAX_CONTACT = 3;

  const setEmailAt = (idx, value) => {
    const next = [...form.contactEmails];
    next[idx] = value;

    // obetnij puste na końcu, ale zostaw min 1
    while (next.length > 1 && !next[next.length - 1].trim()) next.pop();

    update({ contactEmails: next });
  };

  const addEmail = () => {
    if (form.contactEmails.length >= MAX_CONTACT) return;
    update({ contactEmails: [...form.contactEmails, ""] });
  };

  const removeEmail = (idx) => {
    const next = [...form.contactEmails];
    next.splice(idx, 1);
    if (next.length === 0) next.push("");
    update({ contactEmails: next });
  };

  const setPhoneAt = (idx, value) => {
    const next = [...form.contactPhones];
    next[idx] = value;

    while (next.length > 1 && !next[next.length - 1].trim()) next.pop();

    update({ contactPhones: next });
  };

  const addPhone = () => {
    if (form.contactPhones.length >= MAX_CONTACT) return;
    update({ contactPhones: [...form.contactPhones, ""] });
  };

  const removePhone = (idx) => {
    const next = [...form.contactPhones];
    next.splice(idx, 1);
    if (next.length === 0) next.push("");
    update({ contactPhones: next });
  };

  // TODO
  // jeśli checkbox godziny, dojazd zaznaczone to adres i jakie godziny
  // dodać checkbox + input jeśli true ( mam starą stronę internetową którą chcę odświeżyć na nową ) - gdzies na początku 

  return (
    <S.Wrapper $bg={bgEllipse}>
      <S.Shell>
        <S.Topbar>
          <div>
            <S.PageTitle>Finalizacja zamówienia</S.PageTitle>
            <S.PageSub>
              Produkt #{productId} • Plan: <b>{planName}</b>
            </S.PageSub>
          </div>
          <S.TopbarActions>
            <S.GhostButton type="button" onClick={() => navigate(-1)}>
              Wróć
            </S.GhostButton>
          </S.TopbarActions>
        </S.Topbar>

        <S.IntroBox>
          <S.IntroTitle>Po co ten formularz?</S.IntroTitle>
          <S.IntroText>
            Ten formularz zbiera wszystkie informacje, których potrzebujemy, aby przygotować dla Ciebie gotową,
            wypełnioną treściami i działającą stronę — bez dodatkowych rozmów telefonicznych.
          </S.IntroText>

          <S.IntroList>
            <li><b>Treści</b> (opis działalności, oferta, cel strony, klient docelowy)</li>
            <li><b>Materiały</b> (logo, zdjęcia, linki do plików)</li>
            <li><b>Styl i preferencje</b> (inspiracje, układ, funkcjonalności)</li>
          </S.IntroList>

          <S.IntroFoot>
            Wymagane pola oznaczyliśmy <b>*</b>. Im dokładniej uzupełnisz dane, tym szybciej oddamy gotową stronę.
          </S.IntroFoot>
        </S.IntroBox>


        <S.Layout>
          <S.SideNav>
            <S.NavTitle>Kroki</S.NavTitle>
            <S.NavList>
              {STEPS.map((t, idx) => (
                <S.NavItem
                  key={t.key}
                  $active={idx === step}
                  onClick={() => setStep(idx)}
                >
                  <span>{idx + 1}.</span> {t.label}
                </S.NavItem>
              ))}
            </S.NavList>
            <S.StepHint>
              Wymagane pola są oznaczone <b>*</b>.
            </S.StepHint>
          </S.SideNav>

          <S.Main>
            {error && <S.Alert $type="error">{error}</S.Alert>}

            <S.Card>
              <S.CardHeader>
                <S.CardTitle>{STEPS[step].label}</S.CardTitle>
                <S.CardHint>
                  Uzupełnij dane – zajmie to 2–4 minuty — możesz wrócić do poprzednich sekcji w każdej chwili.
                </S.CardHint>
              </S.CardHeader>

              {STEPS[step].key === "company" && (
                <S.Form>

                  {/* SEKCJA: Nazwa firmy */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Nazwa firmy</S.SectionTitle>
                      <S.SectionHint>Pełna nazwa jest wymagana. Skrócona pomoże w projekcie (menu, nagłówki).</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Pełna nazwa firmy *</S.Label>
                      <S.Input
                        value={form.companyFullName}
                        onChange={(e) => update({ companyFullName: e.target.value })}
                        placeholder="np. Twórcza Sieć Sp. z o.o."
                      />
                    </S.Field>

                    <S.Field>
                      <S.Label>Skrócona nazwa / marka (opcjonalnie)</S.Label>
                      <S.Input
                        value={form.companyShortName}
                        onChange={(e) => update({ companyShortName: e.target.value })}
                        placeholder="np. Twórcza Sieć"
                      />
                      <S.Helper>
                        Jeśli masz markę inną niż pełna nazwa (np. „Kwiaciarnia Róża” vs „Anna Kowalska Usługi”), wpisz ją tutaj.
                      </S.Helper>
                    </S.Field>
                  </S.Section>

                  {/* SEKCJA: Branża i model działalności */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Branża i model działalności</S.SectionTitle>
                      <S.SectionHint>To pomoże dopasować układ strony, sekcje, CTA i treści.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Branża (opcjonalnie)</S.Label>
                      <S.Input
                        value={form.industry}
                        onChange={(e) => update({ industry: e.target.value })}
                        placeholder="np. kosmetyka, prawnik, restauracja, budowlanka..."
                      />
                    </S.Field>

                    <S.Field>
                      <S.Label>Jak działa Twoja firma? (zaznacz wszystkie pasujące)</S.Label>

                      <S.CheckboxGrid>
                        {[
                          { id: "info", label: "Strona informacyjna (wizytówka)" },
                          { id: "services", label: "Sprzedaję usługi (np. konsultacje, realizacje)" },
                          { id: "products", label: "Sprzedaję towary (produkty fizyczne)" },
                          { id: "services_products", label: "Sprzedaję usługi i towary" },
                          { id: "bookings", label: "Rezerwacje / wizyty (terminy, kalendarz)" },
                          { id: "leads", label: "Pozyskuję leady (formularz, wycena, kontakt)" },
                          { id: "local", label: "Mam lokal stacjonarny (mapa, dojazd, godziny)" },
                          { id: "online", label: "Działam głównie online (widełki cenowe, proces)" },
                        ].map((opt) => (
                          <S.CheckboxItem key={opt.id}>
                            <input
                              type="checkbox"
                              checked={form.businessModel.includes(opt.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const next = checked
                                  ? [...form.businessModel, opt.id]
                                  : form.businessModel.filter((x) => x !== opt.id);
                                update({ businessModel: next });
                              }}
                            />
                            <span>{opt.label}</span>
                          </S.CheckboxItem>
                        ))}
                      </S.CheckboxGrid>

                      <S.Helper>
                        Nie musisz wiedzieć “wszystkiego” — te wybory pomogą nam dobrać najlepszą strukturę strony.
                      </S.Helper>
                    </S.Field>
                  </S.Section>

                  {/* SEKCJA: Kontakt */}
                    <S.Section>
                      <S.SectionHeader>
                        <S.SectionTitle>Kontakt</S.SectionTitle>
                        <S.SectionHint>
                          Podaj e-maile i telefony kontaktowe.
                        </S.SectionHint>
                      </S.SectionHeader>
                      <S.Divider />

                      <S.Row2>
                        {/* E-maile */}
                        <S.Field>
                          <S.Label>E-mail kontaktowy *</S.Label>

                          <S.DynamicList>
                            {form.contactEmails.map((email, idx) => (
                              <S.DynamicRow key={`email-${idx}`}>
                                <S.Input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmailAt(idx, e.target.value)}
                                  placeholder={idx === 0 ? "np. kontakt@firma.pl" : "np. biuro@firma.pl"}
                                />

                                {idx > 0 && (
                                  <S.IconButton
                                    type="button"
                                    onClick={() => removeEmail(idx)}
                                    aria-label="Usuń e-mail"
                                    title="Usuń"
                                  >
                                    ✕
                                  </S.IconButton>
                                )}
                              </S.DynamicRow>
                            ))}
                          </S.DynamicList>

                          {form.contactEmails.length < MAX_CONTACT && (
                            <S.SecondaryButton type="button" onClick={addEmail}>
                              + Dodaj kolejny e-mail
                            </S.SecondaryButton>
                          )}

                          <S.Helper>
                            Jeśli masz osobny e-mail do faktur / kontaktu technicznego, dodaj go jako kolejny.
                          </S.Helper>
                        </S.Field>

                        {/* Telefony */}
                        <S.Field>
                          <S.Label>Telefony (opcjonalnie)</S.Label>

                          <S.DynamicList>
                            {form.contactPhones.map((phone, idx) => (
                              <S.DynamicRow key={`phone-${idx}`}>
                                <S.Input
                                  value={phone}
                                  onChange={(e) => setPhoneAt(idx, e.target.value)}
                                  placeholder={idx === 0 ? "np. +48 123 456 789" : "np. +48 987 654 321"}
                                />

                                {idx > 0 && (
                                  <S.IconButton
                                    type="button"
                                    onClick={() => removePhone(idx)}
                                    aria-label="Usuń telefon"
                                    title="Usuń"
                                  >
                                    ✕
                                  </S.IconButton>
                                )}
                              </S.DynamicRow>
                            ))}
                          </S.DynamicList>

                          {form.contactPhones.length < MAX_CONTACT && (
                            <S.SecondaryButton type="button" onClick={addPhone}>
                              + Dodaj kolejny numer
                            </S.SecondaryButton>
                          )}

                          <S.Helper>
                            Możesz podać numer do biura i osobny numer do osoby decyzyjnej.
                          </S.Helper>
                        </S.Field>
                      </S.Row2>
                    </S.Section>


                </S.Form>
              )}



              {STEPS[step].key === "assets" && (
                <S.Form>

                  {/* SEKCJA: Logo */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Logo</S.SectionTitle>
                      <S.SectionHint>Dodaj logo i ewentualne warianty.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Czy masz logo?</S.Label>
                      <S.RadioRow>
                        <label>
                          <input
                            type="radio"
                            name="hasLogo"
                            value="yes"
                            checked={form.hasLogo === "yes"}
                            onChange={() => update({ hasLogo: "yes" })}
                          />
                          <span>Tak</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="hasLogo"
                            value="no"
                            checked={form.hasLogo === "no"}
                            onChange={() => update({ hasLogo: "no", logoFiles: [] })}
                          />
                          <span>Nie</span>
                        </label>
                      </S.RadioRow>
                    </S.Field>

                    {form.hasLogo === "yes" && (
                      <>
                        <S.Field>
                          <S.Label>Logo (wgraj 1–5 plików)</S.Label>

                          {form.logoFiles.length === 0 && (
                            <S.File>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  if (file) update({ logoFiles: [file] });
                                }}
                              />
                              <span>Wybierz plik logo</span>
                            </S.File>
                          )}

                          {form.logoFiles.length > 0 && (
                            <S.LogoList>
                              {form.logoFiles.map((file, idx) => (
                                <S.LogoRow key={idx}>
                                  <S.File>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => setLogoAt(idx, e.target.files?.[0] || null)}
                                    />
                                    <span>{file ? file.name : `Wybierz logo #${idx + 1}`}</span>
                                  </S.File>

                                  <S.IconButton
                                    type="button"
                                    onClick={() => removeLogoAt(idx)}
                                    aria-label="Usuń logo"
                                    title="Usuń"
                                  >
                                    ✕
                                  </S.IconButton>
                                </S.LogoRow>
                              ))}
                            </S.LogoList>
                          )}

                          {form.logoFiles.length > 0 &&
                            form.logoFiles.filter(Boolean).length >= 1 &&
                            form.logoFiles.length < MAX_LOGOS && (
                              <S.SecondaryButton type="button" onClick={addLogoSlot}>
                                + Mam więcej wariantów logo
                              </S.SecondaryButton>
                            )}

                          <S.Helper>
                            Warianty mogą mieć inne kolory / układ / znak graficzny. Najlepiej PNG/SVG.
                          </S.Helper>
                        </S.Field>
                      </>
                    )}
                  </S.Section>

                  {/* SEKCJA: Zdjęcia */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Zdjęcia</S.SectionTitle>
                      <S.SectionHint>Dodaj zdjęcia na stronę (opcjonalnie).</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Zdjęcia na stronę (opcjonalnie)</S.Label>
                      <S.File>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) =>
                            update({ images: e.target.files ? Array.from(e.target.files) : [] })
                          }
                        />
                        <span>
                          {form.images.length ? `${form.images.length} plików` : "Dodaj zdjęcia"}
                        </span>
                      </S.File>
                    </S.Field>
                  </S.Section>

                  {/* SEKCJA: Linki i uwagi */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Linki i uwagi</S.SectionTitle>
                      <S.SectionHint>Jeśli masz materiały w chmurze – wklej link.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Link do Google Drive / Dropbox (opcjonalnie)</S.Label>
                      <S.Input
                        value={form.driveLink}
                        onChange={(e) => update({ driveLink: e.target.value })}
                        placeholder="np. https://drive.google.com/..."
                      />
                    </S.Field>

                    <S.Field>
                      <S.Label>Uwagi do materiałów (opcjonalnie)</S.Label>
                      <S.Textarea
                        value={form.assetsNotes}
                        onChange={(e) => update({ assetsNotes: e.target.value })}
                        rows={5}
                        placeholder="np. logo w wersji ciemnej do stopki, zdjęcia z sesji 2024..."
                      />
                    </S.Field>
                  </S.Section>

                </S.Form>
              )}


              {STEPS[step].key === "content" && (
                <S.Form>

                  {/* SEKCJA: Opis działalności */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Opis działalności</S.SectionTitle>
                      <S.SectionHint>Napisz krótko i konkretnie — na tej podstawie zbudujemy treści.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Opis działalności *</S.Label>
                      <S.Textarea
                        value={form.businessDescription}
                        onChange={(e) => update({ businessDescription: e.target.value })}
                        rows={6}
                        placeholder="Napisz czym się zajmujesz, dla kogo i co Cię wyróżnia..."
                      />
                    </S.Field>

                    <S.Field>
                      <S.Label>Usługi / oferta (opcjonalnie)</S.Label>
                      <S.Textarea
                        value={form.services}
                        onChange={(e) => update({ services: e.target.value })}
                        rows={5}
                        placeholder="Lista usług, pakiety, widełki cenowe, najważniejsze informacje..."
                      />
                    </S.Field>
                  </S.Section>

                  {/* SEKCJA: Cel strony */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Cel strony</S.SectionTitle>
                      <S.SectionHint>Wybierz priorytet — to ustawi strukturę, CTA i treści.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Co jest głównym celem strony? *</S.Label>

                      <S.CheckboxGrid>
                        {[
                          { id: "sales", label: "Sprzedaż (zamówienia, koszyk, oferta i konwersje)" },
                          { id: "leads", label: "Pozyskiwanie leadów (formularz, wycena, kontakt)" },
                          { id: "branding", label: "Wizerunek / zaufanie (portfolio, opinie, marka)" },
                          { id: "bookings", label: "Rezerwacje / zapisy (terminy, kalendarz)" },
                          { id: "support", label: "Obsługa klienta (FAQ, instrukcje, kontakt)" },
                        ].map((opt) => (
                          <S.CheckboxItem key={opt.id}>
                            <input
                              type="checkbox"
                              checked={form.siteGoals.includes(opt.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const next = checked
                                  ? [...form.siteGoals, opt.id]
                                  : form.siteGoals.filter((x) => x !== opt.id);
                                update({ siteGoals: next });
                              }}
                            />
                            <span>{opt.label}</span>
                          </S.CheckboxItem>
                        ))}
                      </S.CheckboxGrid>

                      <S.OtherRow>
                        <S.CheckboxItem $compact>
                          <input
                            type="checkbox"
                            checked={!!form.siteGoalOther.trim()}
                            onChange={(e) => {
                              if (!e.target.checked) update({ siteGoalOther: "" });
                              else update({ siteGoalOther: " " }); // odpala input
                            }}
                          />
                          <span>Inne</span>
                        </S.CheckboxItem>

                        <S.Input
                          value={form.siteGoalOther}
                          onChange={(e) => update({ siteGoalOther: e.target.value })}
                          placeholder="Jakie inne? (np. rekrutacja, pobieranie plików, zapisy na newsletter...)"
                          disabled={!form.siteGoalOther.trim() && !form.siteGoalOther.length}
                        />
                      </S.OtherRow>

                      <S.Helper>
                        Możesz zaznaczyć kilka, ale postaraj się wskazać 1–2 najważniejsze.
                      </S.Helper>
                    </S.Field>
                  </S.Section>

                  {/* SEKCJA: Klient docelowy */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Klient docelowy</S.SectionTitle>
                      <S.SectionHint>Komu sprzedajesz? To wpływa na język i sekcje.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Kim jest klient docelowy? *</S.Label>

                      <S.CheckboxGrid>
                        {[
                          { id: "b2b", label: "B2B (firmy)" },
                          { id: "b2c", label: "B2C (klienci indywidualni)" },
                          { id: "local", label: "Lokalnie (miasto/region)" },
                          { id: "poland", label: "Cała Polska" },
                          { id: "abroad", label: "Zagranica" },
                          { id: "niche", label: "Wąska nisza / branża specjalistyczna" },
                        ].map((opt) => (
                          <S.CheckboxItem key={opt.id}>
                            <input
                              type="checkbox"
                              checked={form.targetAudience.includes(opt.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const next = checked
                                  ? [...form.targetAudience, opt.id]
                                  : form.targetAudience.filter((x) => x !== opt.id);
                                update({ targetAudience: next });
                              }}
                            />
                            <span>{opt.label}</span>
                          </S.CheckboxItem>
                        ))}
                      </S.CheckboxGrid>

                      <S.OtherRow>
                        <S.CheckboxItem $compact>
                          <input
                            type="checkbox"
                            checked={!!form.targetAudienceOther.trim()}
                            onChange={(e) => {
                              if (!e.target.checked) update({ targetAudienceOther: "" });
                              else update({ targetAudienceOther: " " });
                            }}
                          />
                          <span>Inne</span>
                        </S.CheckboxItem>

                        <S.Input
                          value={form.targetAudienceOther}
                          onChange={(e) => update({ targetAudienceOther: e.target.value })}
                          placeholder="Opisz klienta (np. mamy, firmy budowlane, właściciele lokali...)"
                          disabled={!form.targetAudienceOther.trim() && !form.targetAudienceOther.length}
                        />
                      </S.OtherRow>

                      <S.Helper>
                        Jeśli chcesz — dopisz 1 zdanie: “dla kogo” i “jaki problem rozwiązujesz”.
                      </S.Helper>
                    </S.Field>
                  </S.Section>

                  {/* SEKCJA: Styl i inspiracje */}
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Styl i inspiracje</S.SectionTitle>
                      <S.SectionHint>Wybór stylu pomoże dobrać layout, fonty i animacje.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Row2>
                      <S.Field>
                        <S.Label>Styl (opcjonalnie)</S.Label>
                        <S.Select
                          value={form.stylePref}
                          onChange={(e) => update({ stylePref: e.target.value })}
                        >
                          <option>Nowoczesny</option>
                          <option>Minimalistyczny</option>
                          <option>Klasyczny</option>
                          <option>Odważny / kreatywny</option>
                        </S.Select>
                      </S.Field>

                      <S.Field>
                        <S.Label>Inspiracje (linki) (opcjonalnie)</S.Label>
                        <S.Input
                          value={form.inspirations}
                          onChange={(e) => update({ inspirations: e.target.value })}
                          placeholder="np. https://example.com, https://..."
                        />
                      </S.Field>
                    </S.Row2>

                    <S.Field>
                      <S.Label>Dane kontaktowe na stronę (opcjonalnie)</S.Label>
                      <S.Textarea
                        value={form.contactData}
                        onChange={(e) => update({ contactData: e.target.value })}
                        rows={4}
                        placeholder="Adres, e-mail, telefon, social media..."
                      />
                    </S.Field>
                  </S.Section>

                </S.Form>
              )}


              {STEPS[step].key === "domain" && (
                <S.Form>

                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Domena</S.SectionTitle>
                      <S.SectionHint>Jeśli masz domenę — wpisz ją. Jeśli nie, zaproponuj 2–3 nazwy.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Czy masz domenę?</S.Label>
                      <S.RadioRow>
                        <label>
                          <input
                            type="radio"
                            name="hasDomain"
                            value="yes"
                            checked={form.hasDomain === "yes"}
                            onChange={() => update({ hasDomain: "yes" })}
                          />
                          <span>Tak</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="hasDomain"
                            value="no"
                            checked={form.hasDomain === "no"}
                            onChange={() => update({ hasDomain: "no" })}
                          />
                          <span>Nie</span>
                        </label>
                      </S.RadioRow>
                    </S.Field>

                    {form.hasDomain === "yes" ? (
                      <S.Field>
                        <S.Label>Nazwa domeny (opcjonalnie)</S.Label>
                        <S.Input
                          value={form.domainName}
                          onChange={(e) => update({ domainName: e.target.value })}
                          placeholder="np. mojadomena.pl"
                        />
                      </S.Field>
                    ) : (
                      <S.Field>
                        <S.Label>Propozycje domen (opcjonalnie)</S.Label>
                        <S.Textarea
                          value={form.domainProposals}
                          onChange={(e) => update({ domainProposals: e.target.value })}
                          rows={4}
                          placeholder="np. tworczasiec.pl, tworczasiec.com, ..."
                        />
                      </S.Field>
                    )}
                  </S.Section>

                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>Technikalia</S.SectionTitle>
                      <S.SectionHint>Jeśli masz specjalne potrzeby techniczne — wpisz tutaj.</S.SectionHint>
                    </S.SectionHeader>
                    <S.Divider />

                    <S.Field>
                      <S.Label>Uwagi techniczne (opcjonalnie)</S.Label>
                      <S.Textarea
                        value={form.techNotes}
                        onChange={(e) => update({ techNotes: e.target.value })}
                        rows={4}
                        placeholder="np. potrzebuję formularza rezerwacji, integracji WhatsApp..."
                      />
                    </S.Field>

                    <S.InfoBox>
                      Hosting na 1 rok jest w cenie — po zakupie otrzymasz dalsze instrukcje w panelu klienta.
                    </S.InfoBox>
                  </S.Section>

                </S.Form>
              )}


              {STEPS[step].key === "summary" && (
                <S.Form>
                  <S.SummaryGrid>
                    <S.SummaryCard>
                      <S.SummaryTitle>Dane</S.SummaryTitle>
                      <S.SummaryLine><b>Firma:</b> {form.companyName || "—"}</S.SummaryLine>
                      <S.SummaryLine><b>E-mail:</b> {form.contactEmail || "—"}</S.SummaryLine>
                      <S.SummaryLine><b>NIP:</b> {form.nip || "—"}</S.SummaryLine>
                      <S.SummaryLine><b>Branża:</b> {form.industry || "—"}</S.SummaryLine>
                    </S.SummaryCard>

                    <S.SummaryCard>
                      <S.SummaryTitle>Treści</S.SummaryTitle>
                      <S.SummaryLine><b>Opis:</b> {form.businessDescription ? "✅" : "—"}</S.SummaryLine>
                      <S.SummaryLine><b>Inspiracje:</b> {form.inspirations || "—"}</S.SummaryLine>
                      <S.SummaryLine><b>Styl:</b> {form.stylePref}</S.SummaryLine>
                    </S.SummaryCard>

                    <S.SummaryCard>
                      <S.SummaryTitle>Materiały</S.SummaryTitle>
                      <S.SummaryLine>
                        <b>Logo:</b>{" "}
                        {form.logoFiles?.filter(Boolean).length
                          ? `${form.logoFiles.filter(Boolean).length} plików`
                          : "—"}
                      </S.SummaryLine>
                      <S.SummaryLine><b>Zdjęcia:</b> {form.images.length ? `${form.images.length} plików` : "—"}</S.SummaryLine>
                      <S.SummaryLine><b>Drive:</b> {form.driveLink || "—"}</S.SummaryLine>
                    </S.SummaryCard>
                  </S.SummaryGrid>

                  <S.CheckRow>
                    <input
                      type="checkbox"
                      checked={form.acceptTerms}
                      onChange={(e) => update({ acceptTerms: e.target.checked })}
                    />
                    <span>
                      Akceptuję regulamin i politykę prywatności <b>*</b>
                    </span>
                  </S.CheckRow>

                  <S.Button type="button" onClick={submitOrder} disabled={saving}>
                    {saving ? "Zapisuję..." : "Przejdź do płatności"}
                  </S.Button>

                  <S.Helper>
                    Po przejściu dalej utworzymy zamówienie i rozpoczniemy proces realizacji.
                  </S.Helper>
                </S.Form>
              )}

              <S.WizardFooter>
                <S.GhostButton type="button" onClick={back} disabled={step === 0}>
                  Wstecz
                </S.GhostButton>

                <S.StepCounter>
                  Krok <b>{step + 1}</b> / {STEPS.length}
                </S.StepCounter>

                {STEPS[step].key !== "summary" ? (
                  <S.ButtonInline type="button" onClick={next} disabled={!canGoNext}>
                    Dalej
                  </S.ButtonInline>
                ) : null}
              </S.WizardFooter>
            </S.Card>
          </S.Main>
        </S.Layout>
      </S.Shell>
    </S.Wrapper>
  );
}

export default CheckoutWizard;
