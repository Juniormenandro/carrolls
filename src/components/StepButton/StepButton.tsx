import { BookingType } from "@/app/page";
import Button from "../Button/Button";
import { bookingDataInitialState } from "@/constants";

type StepButtonProps = {
  step: number;
  checkoutIsLoading: boolean;
  selectedProductId: string;
  selectedTime: string;
  selectedPayment: string;

  setBookingData: (data: BookingType) => void;
  handleBuyProduct: (id: string, updatedData: any) => Promise<void>;
  nome: string; 
  telefone: string; 
  placa: string;
  bookingData: BookingType;
  
};


const StepButton: React.FC<StepButtonProps> = ({
  step,
  checkoutIsLoading,
  selectedProductId,
  selectedPayment,
  selectedTime,
 nome,
  telefone, 
  placa,
  bookingData,
  setBookingData,
  handleBuyProduct,
 
 
  
}) => {
  const handleContinue = () => {
    if (step === 1) {
      setBookingData({
        ...bookingData,
        nome,
        telefone,
        placa,
        step: bookingData.step + 1,
      });
    } else {
      setBookingData({
        ...bookingData,
        step: bookingData.step + 1
      });
    }
  };
  

  const finishBooking = () => {
    
    setBookingData(bookingDataInitialState);
    handleBuyProduct(selectedProductId, bookingData);
  };
  return (
    <>
      

      {step === 0 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!selectedProductId}
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}

      {step === 1 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!selectedPayment}
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}

      {step === 2 && (
        <Button
          type="button"
          isLoading={false}
          disabled={!selectedTime}
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}

      {step === 3 && (
        <Button
          type="button"
          isLoading={false}
          disabled={false}
          onClick={finishBooking}
        >
         Book
        </Button>
      )}
    

<br/><br/>
{step > 0 && (
        <Button
          type="button"
          variant="danger"
          className="mb-3"
          isLoading={false}
          onClick={() => setBookingData(bookingDataInitialState)}
        >
          Cancel
        </Button>
      )}
      <br/><br/><br/><br/>
    </>
  );
};


export default StepButton;
