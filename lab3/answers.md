1	Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern?  What are streams useful for modeling and when might you use them in Rich Web development?
Stream Abstraction:
The stream abstraction is a programming concept that represents a continuous sequence of values occurring over time. Unlike traditional data structures like arrays, streams model the flow of asynchronous data, allowing developers to handle events or data updates in a more organized and efficient manner. Streams are widely used in reactive programming libraries such as RxJS, where they serve as a modernized version of the observer pattern.
Relationship between Streams and Observer Pattern:
The observer pattern is a design pattern where an object, known as the subject, maintains a list of dependents (observers) that need to be notified of any state changes. Streams, in the context of reactive programming, can be viewed as an evolution of the observer pattern. With streams, developers can subscribe to a continuous flow of data and receive notifications as values are emitted over time. This approach simplifies asynchronous event handling and promotes a more declarative coding style.
Usefulness of Streams in Modelling:
Streams are valuable for modelling asynchronous data flows, such as user interactions or API responses. They offer a way to declaratively transform and manipulate data, making code more maintainable. In rich web development, streams find applications in handling UI events, managing real-time updates, and simplifying the coordination of asynchronous operations. They are particularly useful for scenarios requiring concurrency, real-time data handling, and interactive user interfaces.
Use Cases in Rich Web Development:
1.	User Interface Interactivity: Streams are effective for managing user interactions like button clicks and form submissions.
2.	Data Fetching: Streams simplify the handling and transformation of data retrieved asynchronously from APIs.
3.	Real-time Updates: For applications requiring real-time updates, such as live notifications or collaborative editing, streams efficiently manage the continuous flow of data.
4.	Animation: Streams can be employed to handle the timing and sequencing of events in animations and transitions.
5.	State Management: In frameworks like React or Angular, streams contribute to a more reactive approach to component state management.



2	Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

Using RxJS for Asynchronous Network Responses:
In constructing an interface to an API within a Rich Web App, RxJS proves valuable for managing asynchronous network responses. The process involves creating observables for API requests, subscribing to these observables to handle responses, and employing RxJS operators for data transformation and error handling.
1.	Observables for API Requests:
 Generate observables for each API request, often using rxjs.ajax for HTTP requests.
 
2.	Handling Responses:
Utilize the subscribe method to define actions upon successful responses or errors.
               
3.	Chaining and Transforming Data:
Apply RxJS operators like map to transform and extract specific data from responses.
 
4.	Error Handling:
             Use operators such as catchError for concise error handling.
             
Benefits of Using RxJS for Networking:
1.	RxJS facilitates the creation of more expressive and composable code through its operators.
2.	The library offers a robust set of operators for handling complex scenarios involving multiple asynchronous operations.
3.	RxJS enables a consistent treatment of both synchronous and asynchronous data flows, streamlining the development process.
4.	Developers can efficiently manage resources by leveraging RxJS's support for cancellation.

Downsides of Using RxJS for Networking:
1.	Learning Curve: RxJS may pose a learning curve, particularly for those unfamiliar with reactive programming concepts.
2.	Bundle Size: Including the entire RxJS library may contribute to a larger bundle size, a consideration for performance-sensitive applications.
3.	Overhead for Simple Operations: For straightforward tasks, using RxJS might introduce unnecessary complexity compared to simpler alternatives like promises.
4.	Potential for Memory Leaks: Careful subscription management is crucial to avoid memory leaks, adding a layer of responsibility for developers.


3	Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this?

The sharing of global state among asynchronous tasks, denoted as A, B, and C, introduces several consequential challenges. Firstly, concurrency issues may arise due to simultaneous task execution, leading to potential race conditions and unpredictable outcomes. The order of task execution becomes less deterministic, complicating the reasoning about the program's behavior. Debugging efforts become more intricate as state changes asynchronously, posing difficulties in tracing the origins of errors. Furthermore, the dependence of asynchronous tasks on the execution context may result in unexpected behaviors when the order of execution is altered. Lastly, the coupling of tasks to shared global state diminishes their reusability, impeding the modular design of the system.

In the realm of RxJS, a recommended practice to alleviate the aforementioned challenges is the encapsulation of state within observable streams. This entails the utilization of local variables or parameters within observables, ensuring the isolation of state for each asynchronous task. Leveraging RxJS operators for composition, such as mergeMap, switchMap, or concatMap, facilitates the seamless flow of data between observables, fostering a declarative and composable approach to asynchronous task execution.
Additionally, it is better to employ local scope and function parameters when defining functions for tasks A, B, and C. This ensures explicit parameter passing rather than reliance on shared global state, promoting encapsulation and maintainability. The adoption of state management libraries, such as NgRx or Redux, may also be considered for more complex applications, providing a structured and scalable approach to managing application state.





