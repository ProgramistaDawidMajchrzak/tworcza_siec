export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}


export function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  }
  
export const filterSamples = [
    "Potrzebuję strony internetowej dla firmy rachunkowej z formularzem kontaktowym.",
    "Jestem fizjoterapeutą, chciałbym pokazać swoje usługi w sieci.",
    "Szukam sklepu internetowego z butami.",
    "Chciałbym Landing Page z zaprezentowaniem jednego z moich produktów.",
    "Porfolio dla biura nieruchomości",
]

export function getLowestPriceText(financing) {

    if (!Array.isArray(financing)) return null;

    let minPrice = null;
    let minIndex = null;

    financing.forEach((option, index) => {
      if (!option.availability) return;

      const priceStr = option.discount_price && option.discount_price.length > 0
        ? option.discount_price
        : option.price;

      const priceNum = parseFloat(priceStr);
      if (!isNaN(priceNum)) {
        if (minPrice === null || priceNum < minPrice) {
          minPrice = priceNum;
          minIndex = index;
        }
      }
    });

    if (minPrice === null) return null;

    const suffix = minIndex === 0 ? "zł" : "zł /mies";
    return `od ${minPrice} ${suffix}`;
  }