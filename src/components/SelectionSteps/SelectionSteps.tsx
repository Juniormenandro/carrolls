import { BookingType, ProductType } from "@/app/page";
import React from 'react';
import Selector from '../Selector/Selector';


const availableTimeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM", 
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
];
const availablePaymentSlots = [
  "CASH",
  "REVOLUT",
  "ONLINE",
];


type SelectionStepsProps = {
  step: number;
  data?: ProductType[];
  
  bookingData: BookingType;
  setBookingData: (newState: BookingType) => void;
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  telefone: string;
  setTelefone: React.Dispatch<React.SetStateAction<string>>;
  placa: string;
  setPlaca: React.Dispatch<React.SetStateAction<string>>;
};

interface Product {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: number;
};



const SelectionSteps: React.FC<SelectionStepsProps> = ({
  step,
  data,
  bookingData,
  setBookingData,
  nome,
  setNome,
  telefone,
  setTelefone,
  placa,
  setPlaca,
}) => {

  let content: JSX.Element | JSX.Element[] | null = null;
   
  switch (step) {
    case 0:
      content = (data || []).map((product: Product) => (
        <Selector
          key={product.id}
          item={product.id} 
          selectedItem={bookingData.selectedProductId}
          onClick={() => setBookingData({
            ...bookingData,
            selectedProductId: product.id,
            selectedProductNane: product.name, 
            selectedProdutPrice: product.price,
            selectedProductDefaultPrice: product.default_price,
            rawPrice: product.raw_price,
          })} 
        >
          <strong>{product.name}</strong>
          <p>{product.price}</p>
        </Selector>
      ));
      break;
    case 1:
      content = availablePaymentSlots.map((PaymentSlot) => (
        <Selector
          key={PaymentSlot}
          item={PaymentSlot}
          selectedItem={bookingData.selectedPayment}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedPayment: PaymentSlot,
            })
          }
        />
      ));
      break;
    case 2:
      content = availableTimeSlots.map((timeSlot) => (
        <Selector
          key={timeSlot}
          item={timeSlot}
          selectedItem={bookingData.selectedTime}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedTime: timeSlot,
            })
          }
        />
      ));
      break;
      case 3:
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
  
          setBookingData({
            ...bookingData,
            nome,
            telefone,
            placa
          });
        };
        content = (
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <h1 className=" text-2xl">Type Your Name:</h1>
              <input
                key="nome"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid #2F6B90',
                  borderRadius: '10px',
                  fontSize: '22px',
                }}
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="type here..."
              />
            </label>
            <label className="block mb-2">
              <h1 className=" text-2xl">Enter Your Phone Number:</h1>
            <input
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #2F6B90',
                borderRadius: '10px',
                fontSize: '22px',
              }}
              className="block mb-2"
              type="number"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="type here..."
            />
            </label>
            <label className="block mb-2">
              <h1 className=" text-2xl">Car Plate Number:</h1>
            <input
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #2F6B90',
                borderRadius: '10px',
                fontSize: '22px',
              }}
              className="block mb-2"
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              placeholder="type here..."
            />
            </label>
            
          </form>
        );
        break;
   
    default:
      break;
  }

  return (
    <>
      {content}
    </>
  );
};

export default SelectionSteps;
