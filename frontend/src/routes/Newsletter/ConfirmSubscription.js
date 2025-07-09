import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmNewsletter } from "../../services/newsletter.service";

export default function ConfirmSubscription() {
    const { token } = useParams();
    const [message, setMessage] = useState("Trwa potwierdzanie...");

      const fetchConfirmNewsletter = async (token) => {
          try {
              const data = await confirmNewsletter(token);
              setMessage(data.message);
          } catch (error) {
              console.error('Error fetching data:', error);
              setMessage("Błąd podczas potwierdzania. Sprawdź swój link.");
          }
        };

    useEffect(() => {
        fetchConfirmNewsletter(token)
    }, [token]);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>{message}</h2>
        </div>
    );
}
