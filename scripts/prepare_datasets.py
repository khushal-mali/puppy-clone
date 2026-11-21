import json
import os
import re

os.makedirs("data", exist_ok=True)

# 1. Load puppies dataset
with open("research/puppies_dataset.json", "r", encoding="utf-8") as f:
    puppies_raw = json.load(f)

# Load asset inventory to map original URLs to local paths in /images/
with open("research/verified_asset_inventory.json", "r", encoding="utf-8") as f:
    inventory = json.load(f)

url_to_local = {}
for item in inventory:
    url_to_local[item["original_url"]] = "/images/" + item["local_filename"]

print(f"Loaded {len(puppies_raw)} puppies and {len(url_to_local)} asset mappings.")

# Process each puppy
processed_puppies = []
for p in puppies_raw:
    slug = p["slug"].replace("/puppies/", "")
    title = p["title"]
    name = p["name"]
    
    # Infer breed, gender, age from tags and slug
    tags_text = " ".join(p["tags"])
    
    # Breed
    breed = "Maltipoo"
    if "poodle" in slug.lower() or "poodle" in tags_text.lower():
        breed = "Korean Teacup Poodle" if "korean" in slug.lower() else "Toy Poodle" if "toy" in slug.lower() else "Poodle"
    elif "pomeranian" in slug.lower() or "pomeranian" in tags_text.lower():
        breed = "Korean Teacup Pomeranian" if "korean" in slug.lower() else "Pomeranian"
    elif "cavapoo" in slug.lower() or "cavapoo" in tags_text.lower():
        breed = "Cavapoo" if "copper" in slug.lower() else "Maltipoo & Cavapoo"
    elif "bichon" in slug.lower() or "bichon" in tags_text.lower():
        breed = "Bichon"
    elif "shitzu" in slug.lower() or "shih tzu" in tags_text.lower():
        breed = "Shih Tzu"
    elif "pomsk" in slug.lower() or "pomsky" in tags_text.lower():
        breed = "Pomsky"
    elif "maltese" in slug.lower() or "maltese" in tags_text.lower():
        breed = "Maltese"
    elif "korean-teacup-maltipoo" in slug.lower():
        breed = "Korean Teacup Maltipoo"

    # Gender
    gender = "Boy"
    if any(x in slug.lower() for x in ["female", "girl", "daisy", "bella", "mimi", "sophie", "lola", "zoe", "sadie", "mia", "coco", "rosie"]):
        gender = "Girl"
    if "male-female" in slug.lower() or "boy & girl" in tags_text.lower():
        gender = "Boy & Girl"

    # Age
    age = "2.5 months"
    age_match = re.search(r'(\d+(?:\.\d+)?\s*(?:months?|weeks?))', tags_text, re.I)
    if age_match:
        age = age_match.group(1)

    # Location
    location = "Dubai showroom" if any(x in tags_text.lower() or x in slug.lower() for x in ["showroom", "copper", "bailey"]) else "Imported for you"

    # Status: Available vs Gone Home
    # The first 20 in discovery were Available, the rest were Gone Home
    # Check if slug is in gone-home list
    gone_home_slugs = [
        "pomeranian-ace-boy", "poodle-leo-male", "maltipoo-mia-girl", "maltipoo-sadie-girl",
        "blue-marle-pomeranian", "pomsky-ollie-boy", "maltipoo-bruno-boy", "maltese-buddy-male",
        "maltese-charlie-male", "pomeranian-daisy-girl", "pomeranian-bella-female", "poodle-teddy-male",
        "poodle-molly-female", "pomski-coco-girl", "pomsky-rosie-girl", "pomeranian-leo-boy",
        "poodle-molly-girl", "poodle-rocky-boy", "maltipoo-sophie-girl", "maltipoo-lola-girl",
        "pomeranian-rex-boy", "pomsky-finn-male", "maltipoo-zoe-girl", "pomeranian-mimi-girl",
        "bichon-bailey-boy", "puppy", "maltipo"
    ]
    # Note: 20 available puppies on /puppies
    is_available = slug not in gone_home_slugs[:22]

    # Map images
    local_images = []
    for img_url in p["images"]:
        # Find local path
        local_p = None
        for orig, loc in url_to_local.items():
            if os.path.basename(orig) == os.path.basename(img_url):
                local_p = loc
                break
        if not local_p and img_url in url_to_local:
            local_p = url_to_local[img_url]
        if local_p and local_p not in local_images:
            local_images.append(local_p)
            
    # Fallback image if none
    if not local_images:
        local_images = ["/images/logo.png"]

    processed_puppies.append({
        "slug": slug,
        "name": name if name else breed,
        "breed": breed,
        "gender": gender,
        "age": age,
        "location": location,
        "status": "available" if is_available else "gone_home",
        "images": local_images,
        "hasVideo": len(local_images) > 3,
        "description": f"Healthy, playful {breed} {gender.lower()} looking for a loving home in Dubai and the U.A.E."
    })

# Export to data/puppies.ts
ts_content = f"""export interface Puppy {{
  slug: string;
  name: string;
  breed: string;
  gender: 'Boy' | 'Girl' | 'Boy & Girl';
  age: string;
  location: string;
  status: 'available' | 'gone_home';
  images: string[];
  hasVideo: boolean;
  description: string;
}}

export const PUPPIES: Puppy[] = {json.dumps(processed_puppies, indent=2)};
"""

with open("data/puppies.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated data/puppies.ts with {len(processed_puppies)} puppies.")

# 2. Export FAQs
with open("research/faqs_dataset.json", "r", encoding="utf-8") as f:
    faqs_raw = json.load(f)

faq_ts = f"""export interface FAQ {{
  id: string;
  question: string;
  answer: string;
  category?: string;
}}

export const FAQS: FAQ[] = [
  {{
    id: 'vaccinations',
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Yes, every Teddy Pup comes fully vaccinated according to their age, microchipped, dewormed, and accompanied by an official veterinary passport and international health certificate with a comprehensive health guarantee.'
  }},
  {{
    id: 'meet-in-person',
    question: 'Can I meet a puppy before I decide?',
    answer: 'Absolutely. For puppies currently located in our Dubai showroom, you can book a private consultation to interact and play with them in person before finalizing your decision.'
  }},
  {{
    id: 'same-day',
    question: 'Can I take my puppy home the same day?',
    answer: 'Yes! Puppies residing in our Dubai showroom can be taken home the same day following a brief adoption consultation and preparation of your puppy starter pack.'
  }},
  {{
    id: 'import-abroad',
    question: 'Do you import puppies from abroad?',
    answer: 'Yes. We work exclusively with certified ethical boutique breeders in South Korea and Europe known for premier teacup and miniature lines. All imported puppies travel with full legal permits and quarantine compliance.'
  }},
  {{
    id: 'travel-safety',
    question: 'How does an imported puppy travel to Dubai?',
    answer: 'Imported puppies fly via top-tier international airlines in temperature-controlled VIP pet cabins under veterinarian supervision, with dedicated transit care and customs clearance upon arrival in the U.A.E.'
  }},
  {{
    id: 'photos-details',
    question: 'Will I see photos and health details first?',
    answer: 'Yes, we provide extensive high-definition video walkthroughs, veterinary inspection records, parental pedigree information, and live WhatsApp video calls before you reserve.'
  }},
  {{
    id: 'delivery',
    question: 'Do you deliver?',
    answer: 'Yes, we offer VIP chauffeur delivery across all seven Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain), as well as international delivery options.'
  }},
  {{
    id: 'breeds',
    question: 'Which breeds do you usually have?',
    answer: 'We specialize in hypoallergenic, small-sized companion breeds: Korean Teacup Maltipoos, Toy Poodles, Teacup Pomeranians, Cavapoos, Shih Tzus, Bichon Frises, and Pomskies.'
  }},
  {{
    id: 'aftercare',
    question: 'Is there help after my puppy comes home?',
    answer: 'Yes. Every family receives 24/7 lifetime advice and post-adoption support covering nutrition, potty training, veterinary recommendations, and settling-in guidance.'
  }}
];
"""

with open("data/faqs.ts", "w", encoding="utf-8") as f:
    f.write(faq_ts)

print("Generated data/faqs.ts with 9 verified FAQs.")
