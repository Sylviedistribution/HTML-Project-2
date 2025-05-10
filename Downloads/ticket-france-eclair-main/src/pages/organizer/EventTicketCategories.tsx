import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import * as Select from "@radix-ui/react-select";
import { Check } from "lucide-react";

const EventTicketCategories = () => {
  const { id } = useParams();
  
  type TicketCategory = {
    name: string;
    price: string;
    quantity: string;
    currency: string;
  };

  const [categories, setCategories] = useState<TicketCategory[]>([
    { name: "", price: "", quantity: "", currency: "" },
  ]);

  const CURRENCY_OPTIONS = ["XOF", "FCFA", "EUR", "USD", "GBP"];

  const handleAdd = () => {
    setCategories([...categories, { name: "", price: "", quantity: "", currency: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newCategories = [...categories];
    newCategories[index][field as keyof TicketCategory] = value;
    setCategories(newCategories);
  };

  const handleSubmit = () => {
    console.log("Submitting:", categories);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Ajouter des catégories de tickets</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-2xl p-6 border space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nom de la catégorie"
                  value={cat.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
                <Input
                  placeholder="Prix"
                  type="number"
                  min={0}
                  value={cat.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
                <Input
                  placeholder="Quantité"
                  type="number"
                  min={0}
                  value={cat.quantity}
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
                />
                <Select.Root
                  value={cat.currency}
                  onValueChange={(value) => handleChange(index, "currency", value)}
                >
                  <Select.Trigger className="border rounded px-3 py-2 bg-white text-sm">
                    <Select.Value placeholder="Devise" />
                  </Select.Trigger>
                  <Select.Content className="bg-white border rounded shadow-lg z-50">
                    <Select.Viewport className="p-1">
                      {CURRENCY_OPTIONS.map((currency) => (
                        <Select.Item
                          key={currency}
                          value={currency}
                          className="relative flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded"
                        >
                          <Select.ItemText>{currency}</Select.ItemText>
                          <Select.ItemIndicator className="absolute right-2">
                            <Check size={16} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4">
            <Button type="button" onClick={handleAdd} variant="outline">
              Ajouter une catégorie
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EventTicketCategories;
