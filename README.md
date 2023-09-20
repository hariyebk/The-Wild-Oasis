# The Wild Oasis

<p text-align = "justify">
The Wild Oasis is a charming boutique hotel nestled in a serene location, offering 15 luxurious wooden cabins for a truly unforgettable stay.
To streamline their operations and enhance guest experiences, "The Wild Oasis" is embarking on a project to develop a custom-built Internal Hotel Management App.The main objective of this project is to create a comprehensive application that will handle all aspects of hotel management, including bookings, cabin availability, and guest information. The Internal Hotel Management App will serve as a central hub for hotel staff, providing them with the necessary tools to efficiently manage check-ins, handle reservations, and deliver exceptional customer service.The app will feature an intuitive dashboard that provides insightful analytics. The dashboard will be powered with charts and graphs, offering visual representations of key performance indicators. Hotel staff will be able to analyze total sales, track the number of prepaid customers, monitor the occupancy rate, and gain valuable insights into the hotel's performance.
</p>


<h1 align="center">
    <img src="public/logo-light.png"/>
</h1>

## Main Features

- **User Authentication**: Only hotel employees can sign up and log into the application. New users can sign up within the app by other employees, ensuring that only authorized personnel have access. Users have the ability to upload an avatar and update their name and password.

- **Cabin Management**: The app includes a table view that displays all cabins with relevant details such as cabin photo, cabin id, capacity, price, and current discount. Users can update, delete, or create new cabins, including the ability to upload cabin photos.

- **Booking Management**: The app provides a comprehensive table view of all bookings, showing arrival and departure dates, booking status, paid amount, and associated cabin and guest data. The booking status can be filtered by "unconfirmed," "checked in," or "checked out." Additional booking data includes the number of guests, number of nights, guest observations, and breakfast information. Users can delete, update, create, check in, or check out a booking as guests arrive. On check-in, users can confirm payment receipt (outside the app) and add breakfast for the entire stay if necessary.

- **Guest Management**: The app also provides a comprehensive table view of all Guests, showing Their name, address, age, gender, diet-preference and nationality. Guests can be filtered by Gender and sorted by their age, name and many-more. users can create a new guest when they arrive, update their information or delete a guest when necessary.

- **Dashboard**: The initial app screen is a dashboard that provides important information for the last 7, 30, or 90 days. It includes a list of guests checking in and out on the current day, statistics on recent bookings, sales, check-ins, number of pre-paid guests and occupancy rate. The dashboard also features charts displaying daily hotel sales (including extras) and stay duration statistics.

- **Application Settings**: Users can define application-wide settings such as breakfast price, minimum and maximum nights per booking, and maximum guests per booking.

-  **Dark Mode**: The app supports a dark mode option for enhanced user experience.

- **supabase**: The app uses Supabase API to perform CRUD operations, for data storage and authentication. Supabase provides a secure and scalable infrastructure and backend as a service.

## Tech Stack

* React - To create reusable UI components and efficiently manage the application's state.
* React Hook Form - To handle form validation, error handling, and form submission.
* React Hot Toast - To easily display temporary notifications or alerts to users in an unobtrusive manner.
* React Icons -  To easily include icons from popular icon libraries.
* React Error Boundary - To display a fallback UI instead of crashing the whole application when an error occurs.
* Recharts - To visualize data in a visually appealing way.
* Styled Components - To write CSS styles directly within their JavaScript code and create reusable components.
* Supabase - For data storage, authentication, and real-time updates. For detailed instructions on setting up and using the Supabase API, refer to the [Supabase documentation](https://supabase.io/docs).
* React Query - For remote state management, data fetching, caching, synchronization, and updating.


<p align="center" style="margin-top: 40px;">
    <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" alt="react"  width="70" height="70"/>
    <img src="https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png" alt="react-query"  width="70" height="70"/>
    <img src ="https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" alt="react-hook-form"  width="70" height="70"/>
    <img src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" alt="supabase" width="70" height="70"/>
    <img src="https://cdn.worldvectorlogo.com/logos/styled-components-1.svg" alt="styled components" width="70" height="70"/>
</p>


## Login Credentials

- **Email** : dayoxot525@cohodl.com
- **password** :  testtest1234

- **Email** : harunbekri6@gmail.com
- **password** :  testtest1234

## Installation
You can fork the app or you can git-clone the app into your local machine. Once done, please install all the
dependencies by running

```
$ npm install - To Install dependencies 
$ npm run dev - Launch the app
```
Open your browser and visit http://localhost:5173 to view the app.

## Contributing 

Contributions are welcome and encouraged! To contribute please follow these steps:

1. Fork this repository by clicking on the "Fork" button at the top right corner of the page.
2. Create a new branch: `git checkout -b my-new-feature
3. Make changes to files according to desired feature(s).
4. Commit your changes: `git commit -am 'Add some feature'`.
5. Push to the branch: `git push origin my-new-feature`.
6. Submit a pull request by opening PR in the original repository (not yours)

I review all pull requests thoroughly and appreciate every contribution made.


If you find any bugs/issues/errors please create an issue ticket/appropriate category within issues in Github.


## License

This project is licensed under MIT license - see LICENSE.md for more details.
