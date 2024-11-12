const  Treatment  = require('../models/treatments');

exports.getTreatments = async (req, res) => {
    try {
      const treatments = await Treatment.findAll();
      const groupedTreatments = groupTreatmentsByCategory(treatments);
      res.json(groupedTreatments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch treatments", error });
    }
  };
  
  const groupTreatmentsByCategory = (treatments) => {
    const categories = [
      "Consultation", "Per session", "Per unit", "Per vial", "Per thread",
      "Package (3 sessions)", "Package (6 sessions)", "Per procedure", "Add-on",
      "Per injection", "Per combo", "Per implant", "Per IUD"
    ];
  
    return categories.map((category) => ({
      category,
      items: treatments
        .filter(treatment => treatment.unit === category)
        .map(treatment => ({
          treatment_name: treatment.treatment_name,
          price: treatment.price  // Include price here
        })),
    }));
  };
  
