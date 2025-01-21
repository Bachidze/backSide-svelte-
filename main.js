const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 3000;
app.use(cors())
app.use(express.json());


const animals = [
  {
    id: 1,
    name: "dog",
    age: 12,
    specie: "domestic",
  },
  {
    id: 2,
    name: "cow",
    age: 33,
    specie: "domestic",
  },
  {
    id: 4,
    name: "hawk",
    age: 121,
    specie: "wild",
  },
  {
    id: 5,
    name: "eagle",
    age: 300,
    specie: "wild",
  },
];

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.get("/shop/:cateogry:id",(req,res) => {
    console.log(req.params)
    res.send("shop")
})

app.get("/api", (req, res) => {
  res.status(200).json({ message: "request send Succesfully", data: animals });
});

app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  const animalByID = animals.find((el) => el.id === Number(id));
  if (!animalByID) {
    return res
      .status(404)
      .json({ message: "Animal not Found Try other ID", data: null });
  }
  res.json({ message: "request send Succesfully", data: animalByID });
});

app.post("/api", (req, res) => {
  const { name, age, specie } = req.body;
  if (!age || !specie) {
    res.status(400).json({ message: "age and specie is required", data: null });
  }
  const lastid = animals[animals.length - 1]?.id || 0;
  const newObj = {
    id: lastid + 1,
    name,
    age,
    specie,
  };

  animals.push(newObj);
  res
    .status(201)
    .json({ message: "animal created successfully", data: newObj });
});

app.delete("/api/:id", (req, res) => {
  const { id } = req.params;
  const index = animals.findIndex((el) => el.id === Number(id));
  if (index === -1) {
    return res.status(400).json({ message: "Animal not found", data: null });
  }
  const animal = animals.splice(index, 1);

  res.json({ messsage: "deleted successfuly", data: animal });
});


app.put("/api/:id",(req,res) => {
    const { name, age, specie } = req.body;
    const { id } = req.params;
    const index = animals.findIndex(el => el.id === Number(id))
    if(index === -1){
        return res.status(404).json({message:"Not Found",data:null})
    }
    animals[index] = {
        ...animals[index],
        name:name || animals[index].name,
        age:age || animals[index].age,
        specie:specie || animals[index].specie,
       
    }

    res.status(200).json({message:"updated successfully",data:animals[index]})
})

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
