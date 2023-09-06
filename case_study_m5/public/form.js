// ELEMENT
const $ = document.querySelector.bind(document);
const villa = $("#villa");
const room = $("#room");
const house = $("#house");
const facilitiesElement = $("#facilities");
const roomAminities = $("#room-aminities");
const roomAminitiesProps = $("#room-aminities-props");

// EVENTS
const handleFacilitiesEvents = () => {
  facilitiesElement.onchange = () => {
    const facilityValue = facilitiesElement.value;

    switch (facilityValue) {
      case "0":
        villa.style.display = "none";
        house.style.display = "none";
        room.style.display = "none";
        break;
      case "1":
        villa.style.display = "block";
        house.style.display = "none";
        room.style.display = "none";
        break;
      case "2":
        villa.style.display = "none";
        house.style.display = "block";
        room.style.display = "none";
        break;
      case "3":
        villa.style.display = "none";
        house.style.display = "none";
        room.style.display = "block";
        break;
      default:
        throw new Error("Value dịch vụ không hợp lệ");
    }
  };
};

const handleAminitiesEvents = () => {
  roomAminities.onchange = () => {
    const roomAminitiesValue = roomAminities.value;
    switch (roomAminitiesValue) {
      case "0":
        roomAminitiesProps.style.display = "none";
        break;
      case "1":
        roomAminitiesProps.style.display = "block";
        break;
      // case 2:
      //     roomAminitiesProps.style.display = 'block'
      //     break;
      default:
        throw new Error("Value dịch vụ đi kèm không hợp lệ");
    }
  };
};

const start = () => {
  // su kien
  handleFacilitiesEvents();
  handleAminitiesEvents();
};

start();