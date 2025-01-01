import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  // Get cabins
  const { data, error } = await supabase.from("cabins").select("*");
  throwError(error, "Cabins could not be loaded");
  return data;
}

export async function createCabin(newCabin) {
  return await createOrUpdate(newCabin, null);
}

export async function editCabin(editableCabin, id) {
  return await createOrUpdate(editableCabin, id);
}

export async function deleteCabin(id) {
  // Delete cabin
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  throwError(error, "Cabins could not be deleted");
  return null;
}

//////////  Reuseable functions //////////
async function createOrUpdate(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const { imageName, imagePath } = convertImageToPath(cabin, hasImagePath);

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);
  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  throwError(error, "Cabins could not be loaded");
  if (hasImagePath) return data;
  await storeImageAndIfImageFailedDeleteCabin(imageName, cabin, data);
  return data;
}

function convertImageToPath(cabin, hasImagePath) {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  return { imageName, imagePath };
}

async function storeImageAndIfImageFailedDeleteCabin(imageName, cabin, data) {
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await deleteCabin(data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
}

function throwError(error, message) {
  if (error) {
    console.error(error);
    throw new Error(message);
  }
}
//////////  Reuseable functions end //////////
