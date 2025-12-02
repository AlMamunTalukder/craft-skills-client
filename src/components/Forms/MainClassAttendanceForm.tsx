"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { createAttendenceDateRoutine, getBatches, updateAttendenceDateRoutine } from "@/queries/attendence";
import TextInput from "../FormInputs/TextInput";
import { Server, Plus, Minus, Users, Star } from "lucide-react";
import AppForm from "./AppForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Batch = {
  id: string;
  name: string;
  code: number;
};

type ClassRoutine = {
  className: string;
  type: "main" | "special" | "guest";
  guestName?: string;
};

type Props = {
  initialValues?: any;
  loading?: boolean;
};

export default function MainClassAttendanceForm({
  initialValues,
  loading = false,
}: Props) {
  const router = useRouter();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>(initialValues?.batchId || "");
  const [selectedBatchCode, setSelectedBatchCode] = useState<string>(initialValues?.batchCode || "");
  const [activeTab, setActiveTab] = useState("mainclass");
  const [isLoading, setIsLoading] = useState(false);

  // Single state for all classes with type
  const [allClasses, setAllClasses] = useState<ClassRoutine[]>(
    initialValues?.classes || [
      { className: "Class 1", type: "main" }
    ]
  );

  // Fetch batches on component mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const batchData = await getBatches();
        setBatches(batchData);
      } catch (error) {
        toast.error("Failed to load batches");
      }
    };
    fetchBatches();
  }, []);

  // Update batch code when batch is selected
  const handleBatchChange = (batchId: string) => {
    setSelectedBatch(batchId);
    const selectedBatch = batches.find(batch => batch.id === batchId);
    if (selectedBatch) {
      setSelectedBatchCode(selectedBatch.code.toString());
    }
  };

  // Class Handlers
  const handleAddClass = () => {
    const newClass: ClassRoutine = {
      className: `${activeTab === "mainclass" ? "Class" : activeTab === "specialclass" ? "Special Class" : "Guest Class"} ${getFilteredClasses(getCurrentTabType()).length + 1}`,
      type: getCurrentTabType(),
      guestName: activeTab === "guestclass" ? "" : undefined
    };
    
    setAllClasses([...allClasses, newClass]);
  };

  const handleRemoveClass = (index: number) => {
    const updatedClasses = allClasses.filter((_, i) => i !== index);
    setAllClasses(updatedClasses);
  };

  const handleClassChange = (index: number, field: keyof ClassRoutine, value: string) => {
    const updatedClasses = [...allClasses];
    updatedClasses[index] = {
      ...updatedClasses[index],
      [field]: value
    };
    setAllClasses(updatedClasses);
  };

  const getCurrentTabType = (): "main" | "special" | "guest" => {
    return activeTab === "mainclass" ? "main" : 
           activeTab === "specialclass" ? "special" : "guest";
  };

  const getFilteredClasses = (type: "main" | "special" | "guest") => {
    return allClasses.filter(classItem => classItem.type === type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    
    if (!selectedBatch) {
      toast.error("Please select a batch");
      return;
    }

    if (!selectedBatchCode) {
      toast.error("Batch code is required");
      return;
    }

    // Validate current tab classes
    const currentTabClasses = getFilteredClasses(getCurrentTabType());
    if (currentTabClasses.length === 0) {
      toast.error(`Please add at least one ${getCurrentTabType()} class`);
      return;
    }

    const isValid = currentTabClasses.every(classItem => 
      classItem.className && classItem.className.trim() !== "" &&
      (classItem.type !== "guest" || (classItem.guestName && classItem.guestName.trim() !== ""))
    );

    if (!isValid) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading(
      initialValues?.id ? "Updating attendance routine..." : "Creating attendance routine..."
    );

    try {
      // Prepare data for database - send ALL classes
      const data = {
        batchId: selectedBatch,
        batchCode: selectedBatchCode,
        classes: allClasses, // Send all classes together
        isActive: true
      };

      console.log("📤 Sending data to database:", data);

      let result;
      if (initialValues?.id) {
        result = await updateAttendenceDateRoutine(initialValues.id, data);
        toast.success("🎉 Attendance routine updated successfully!", { id: toastId });
      } else {
        result = await createAttendenceDateRoutine(data);
        toast.success("🎉 Attendance routine created successfully!", { id: toastId });
      }

      console.log("✅ Database response:", result);

      // Reset form after successful submission for new entries
      if (!initialValues?.id) {
        setAllClasses([{ className: "Class 1", type: "main" }]);
        setSelectedBatch("");
        setSelectedBatchCode("");
      }

      router.push("/dashboard/attendancemainclass/list");
      router.refresh();

    } catch (error: any) {
      console.error("❌ Submission error:", error);
      toast.error(`Failed to save: ${error.message || "Something went wrong"}`, {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSubmitButtonText = () => {
    if (isLoading) return "Saving...";
    
    const baseText = initialValues?.id ? "Update" : "Create";
    const classType = activeTab === "mainclass" ? "Class" : 
                     activeTab === "specialclass" ? "Special Class" : "Guest Class";
    
    return `${baseText} ${classType} Routine`;
  };

  // Get counts for display
  const mainClassCount = getFilteredClasses("main").length;
  const specialClassCount = getFilteredClasses("special").length;
  const guestClassCount = getFilteredClasses("guest").length;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {initialValues?.id ? "Update" : "Create"} Attendance Class Routine
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 text-sm">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Main: {mainClassCount}</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Special: {specialClassCount}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Guest: {guestClassCount}</span>
            </div>
            <div className="w-[150px]">
              <Select
                value={selectedBatch}
                onValueChange={handleBatchChange}
                disabled={!!initialValues?.id}
              >
                <SelectTrigger className="rounded-full border-yellow-400 border-2">
                  <SelectValue placeholder="Select a Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Batch No</SelectLabel>
                    {batches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.code}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="mainclass" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Main Class
            </TabsTrigger>
            <TabsTrigger value="specialclass" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Special Class
            </TabsTrigger>
            <TabsTrigger value="guestclass" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guest Class
            </TabsTrigger>
          </TabsList>

          {/* Main Class Tab */}
          <TabsContent value="mainclass" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Main Class Schedule</h3>
              <Button
                type="button"
                onClick={handleAddClass}
                className="rounded-full"
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Class
              </Button>
            </div>

            <AppForm onSubmit={handleSubmit} defaultValues={{}}>
              <div className="space-y-4">
                {getFilteredClasses("main").map((classItem, index) => {
                  const globalIndex = allClasses.findIndex(c => c === classItem);
                  return (
                    <div
                      key={globalIndex}
                      className="p-4 border rounded-lg space-y-3 bg-blue-50/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Class {index + 1}</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleRemoveClass(globalIndex)}
                          className="rounded-full"
                          variant="outline"
                          size="icon"
                        >
                          <Minus className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>

                      <TextInput
                        label="Class Name"
                        name={`className-${globalIndex}`}
                        placeholder="Enter class name"
                        value={classItem.className}
                        onChange={(e) => handleClassChange(globalIndex, 'className', e.target.value)}
                      />
                    </div>
                  );
                })}

                <div className="pt-4 flex justify-between items-center border-t">
                  <div className="text-sm text-gray-500">
                    Total Main Classes: {mainClassCount}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {getSubmitButtonText()}
                  </Button>
                </div>
              </div>
            </AppForm>
          </TabsContent>

          {/* Special Class Tab */}
          <TabsContent value="specialclass" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Special Class Schedule</h3>
              <Button
                type="button"
                onClick={handleAddClass}
                className="rounded-full"
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Class
              </Button>
            </div>

            <AppForm onSubmit={handleSubmit} defaultValues={{}}>
              <div className="space-y-4">
                {getFilteredClasses("special").map((classItem, index) => {
                  const globalIndex = allClasses.findIndex(c => c === classItem);
                  return (
                    <div
                      key={globalIndex}
                      className="p-4 border rounded-lg space-y-3 bg-orange-50/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Special Class {index + 1}</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleRemoveClass(globalIndex)}
                          className="rounded-full"
                          variant="outline"
                          size="icon"
                        >
                          <Minus className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>

                      <TextInput
                        label="Special Class Name"
                        name={`specialClassName-${globalIndex}`}
                        placeholder="Enter special class name"
                        value={classItem.className}
                        onChange={(e) => handleClassChange(globalIndex, 'className', e.target.value)}
                        
                      />
                    </div>
                  );
                })}

                <div className="pt-4 flex justify-between items-center border-t">
                  <div className="text-sm text-gray-500">
                    Total Special Classes: {specialClassCount}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 bg-orange-600 text-white hover:bg-orange-700"
                  >
                    {getSubmitButtonText()}
                  </Button>
                </div>
              </div>
            </AppForm>
          </TabsContent>

          {/* Guest Class Tab */}
          <TabsContent value="guestclass" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Guest Class Schedule</h3>
              <Button
                type="button"
                onClick={handleAddClass}
                className="rounded-full"
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Class
              </Button>
            </div>

            <AppForm onSubmit={handleSubmit} defaultValues={{}}>
              <div className="space-y-4">
                {getFilteredClasses("guest").map((classItem, index) => {
                  const globalIndex = allClasses.findIndex(c => c === classItem);
                  return (
                    <div
                      key={globalIndex}
                      className="p-4 border rounded-lg space-y-3 bg-green-50/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Guest Class {index + 1}</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleRemoveClass(globalIndex)}
                          className="rounded-full"
                          variant="outline"
                          size="icon"
                        >
                          <Minus className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <TextInput
                          label="Class Name"
                          name={`guestClassName-${globalIndex}`}
                          placeholder="Enter class name"
                          value={classItem.className}
                          onChange={(e) => handleClassChange(globalIndex, 'className', e.target.value)}
                          
                        />

                        <TextInput
                          label="Guest Name"
                          name={`guestName-${globalIndex}`}
                          placeholder="Guest speaker name"
                          value={classItem.guestName || ""}
                          onChange={(e) => handleClassChange(globalIndex, 'guestName', e.target.value)}
                          
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 flex justify-between items-center border-t">
                  <div className="text-sm text-gray-500">
                    Total Guest Classes: {guestClassCount}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 bg-green-600 text-white hover:bg-green-700"
                  >
                    {getSubmitButtonText()}
                  </Button>
                </div>
              </div>
            </AppForm>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}