import ContactPageContainer from "./_components/ContactPageContainer";

const pathsData = [
  {
    name: "Home",
    href: "/",
    active: false,
  },
  {
    name: "Pages",
    href: "#",
    active: false,
    hasDropdown: true,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    active: true,
  },
];

const ContactUsPage = () => {
  return (
    <div>
      <ContactPageContainer></ContactPageContainer>
    </div>
  );
};

export default ContactUsPage;
