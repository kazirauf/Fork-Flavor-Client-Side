"use client"
import { Image } from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
const FAQ = () => {
    return (
        <div>
            <section>
            <h1 className="text-center text-4xl font-bold">F <span className="text-[#e69f42]">A</span> Q</h1>
           <div className='flex justify-center items-center mx-auto my-20 mx-52'>

    <Accordion variant="splitted">
      <AccordionItem key="1" aria-label="Accordion 1" title="How do I sign up for the Recipe Sharing Community?" className="text-white">
      You can sign up by clicking the "Sign Up" button on the homepage and filling out the required information. You can also register using your Google or Facebook account.
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Is there a cost to use the platform?" className="text-white">
      The core features of the platform, such as browsing and submitting recipes, are free. However, premium features like access to exclusive recipes and content require a subscription.
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="How can I submit a recipe?" className="text-white">
      Once you’re logged in, go to the Submit Recipe section, fill in the required details such as ingredients, instructions, and cooking time, and upload a photo of your dish.
      </AccordionItem>
    </Accordion>

<div>
    <Image className='lg:max-w-xl max-w-sm  rounded-lg shadow-2xl lg:ml-10' src="https://images.pexels.com/photos/6266316/pexels-photo-6266316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="g" />
</div>

        </div>
     </section>
        </div>
    );
};

export default FAQ;